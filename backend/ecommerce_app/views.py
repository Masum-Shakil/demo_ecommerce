from rest_framework import generics, permissions
from . import models, serializers
from rest_framework.response import Response
from django.http import JsonResponse
from user_app.models import CustomUser
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from .models import Order

def generate_invoice(request, order_id):
    order = Order.objects.get(id=order_id)
    user = order.user  # Get user information

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="invoice_{order.id}.pdf"'

    # Create a PDF document
    pdf = SimpleDocTemplate(response, pagesize=letter)

    # Create a list to hold the elements for the PDF
    elements = []

    # Add title and order information
    styles = getSampleStyleSheet()
    elements.append(Paragraph(f'Invoice for Order ID: {order.id}', styles['Title']))
    elements.append(Paragraph(f'Transaction ID: {order.tran_id}', styles['Normal']))
    elements.append(Paragraph(f'Total Amount: {order.total_amount} BDT', styles['Normal']))
    elements.append(Paragraph(f'Status: {order.status}', styles['Normal']))
    
    # Add user information
    elements.append(Paragraph(f'User: {user.username}', styles['Normal']))
    elements.append(Paragraph(f'Email: {user.email}', styles['Normal']))
    
    elements.append(Paragraph('Products:', styles['Heading3']))

    # Create the product table
    product_data = [['Product Name', 'Price']]  # Table headers
    for item in order.order_items.all():
        product_data.append([item.product.name, f'{item.product.price} BDT'])

    # Create a Table
    product_table = Table(product_data)

    # Add some styling to the table
    product_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),  # Header row background
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),  # Header row text color
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),  # Center align all cells
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),  # Header font
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),  # Padding for header
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),  # Body background
        ('GRID', (0, 0), (-1, -1), 1, colors.black),  # Grid lines
    ]))

    # Add the table to the elements list
    elements.append(product_table)

    # Build the PDF
    pdf.build(elements)

    return response


def user_counts(request, id):
    wishlist_count = models.WishlistItem.objects.filter(user_id=id).count()
    cart_count = models.CartItem.objects.filter(user_id=id).count()
    
    return JsonResponse({
        'wishlist_count': wishlist_count,
        'cart_count': cart_count
    })

class CategoryView(generics.ListAPIView):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer

class ProductView(generics.ListAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer

    def get(self, request, *args, **kwargs):
        product = self.get_object()
        if not request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            product.increment_views()
        return self.retrieve(request, *args, **kwargs)
    
class MostWatchedProductsView(generics.ListAPIView):
    queryset = models.Product.objects.all().order_by('-watched')[:4]
    serializer_class = serializers.ProductSerializer

class MostSoldProductsView(generics.ListAPIView):
    queryset = models.Product.objects.all().order_by('-sold')[:4]
    serializer_class = serializers.ProductSerializer

class CartView(generics.GenericAPIView):

    def post(self, request):
        product_id = request.data.get('product_id')
        user_id = request.data.get('user_id')

        try:
            cart = models.CartItem.objects.get(user_id=user_id, product_id=product_id)
            return Response({'message': 'Product is already in the cart.'}, status=400)
        
        except:
            cart = models.CartItem.objects.create(user_id=user_id, product_id=product_id)
            return Response({'message': 'Product is added to the cart.'}, status=201)
        
class WishListView(generics.GenericAPIView):

    def post(self, request):
        product_id = request.data.get('product_id')
        user_id = request.data.get('user_id')

        try:
            wishlist = models.WishlistItem.objects.get(user_id=user_id, product_id=product_id)
            return Response({'message': 'Product is already in the wishlist.'}, status=400)
        
        except:
            wishlist = models.WishlistItem.objects.create(user_id=user_id, product_id=product_id)
            return Response({'message': 'Product is added to the wishlist.'}, status=201)
        
class CartItemList(generics.ListAPIView):
    serializer_class = serializers.CartItemSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        return models.CartItem.objects.filter(user_id=user_id)
    
class CartItemDelete(generics.DestroyAPIView):
    queryset = models.CartItem.objects.all()
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
    
class WishListItem(generics.ListAPIView):
    serializer_class = serializers.WishListSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        return models.WishlistItem.objects.filter(user_id=user_id)
    
class WishListItemDelete(generics.DestroyAPIView):
    queryset = models.WishlistItem.objects.all()
    lookup_field = 'id'

    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
    

# ecommerce/views.py

import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from sslcommerz_lib import SSLCOMMERZ 
from datetime import datetime, date, timedelta

@api_view(['POST'])
def initiate_payment(request):
    user = CustomUser.objects.get(id=request.data.get('user_id'))

    settings = { 'store_id': 'selfd66f1ba783cf3c', 'store_pass': 'selfd66f1ba783cf3c@ssl', 'issandbox': True }
    sslcz = SSLCOMMERZ(settings)
    post_body = {}
    post_body['total_amount'] = request.data.get('total_amount')
    post_body['currency'] = "BDT"
    post_body['tran_id'] = request.data.get('tran_id')
    post_body['success_url'] = "https://www.w3schools.com/python/default.asp"
    post_body['fail_url'] = 'http://localhost:3000/payment-fail'
    post_body['cancel_url'] = 'http://localhost:3000/payment-cancel'
    post_body['emi_option'] = 0
    post_body['cus_name'] = user.username
    post_body['cus_email'] = user.email
    post_body['cus_phone'] = user.mobile_number
    post_body['cus_add1'] = user.address
    post_body['cus_city'] = "Dhaka"
    post_body['cus_country'] = "Bangladesh"
    post_body['shipping_method'] = "NO"
    post_body['multi_card_name'] = ""
    post_body['num_of_item'] = 1
    post_body['product_name'] = "Test"
    post_body['product_category'] = "Test Category"
    post_body['product_profile'] = "general"


    response = sslcz.createSession(post_body) # API response
    print(response)
    print(type(response))
    # response_data = response.json()
    
    if response['status'] == 'SUCCESS':
        order = models.Order.objects.create(user = user, total_amount=request.data.get('total_amount'), tran_id= request.data.get('tran_id'), status="Completed")
        cart_item = models.CartItem.objects.filter(user = user)

        for item in cart_item:
            models.OrderItem.objects.create(order=order, product_id =item.product.id)
            product = models.Product.objects.get(id=item.product.id)
            product.sold += 1
            product.save()
            item.delete()

        return Response(response, status=status.HTTP_200_OK)
    else:
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    
class OrderListView(generics.ListAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
