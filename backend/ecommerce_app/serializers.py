from rest_framework import serializers
from . import models

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Product
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = models.CartItem
        fields = ['id', 'product']

class WishListSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = models.WishlistItem
        fields = ['id', 'product']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = models.OrderItem
        fields = ['product']

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = models.Order
        fields = ['id', 'user', 'total_amount', 'status', 'tran_id', 'created_at', 'order_items']