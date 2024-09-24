from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.CategoryView.as_view(), name='categories'),
    path('products/', views.ProductView.as_view(), name='products'),
    path('products/most-watched/', views.MostWatchedProductsView.as_view(), name='products_most_watched'),
    path('products/most-sold/', views.MostSoldProductsView.as_view(), name='products_most_sold'),
    path('product/<int:pk>/', views.ProductDetailView.as_view(), name='product_detail'),
    path('cart/', views.CartView.as_view(), name='cart-items'),
    path('wishlist/', views.WishListView.as_view(), name='wishlist-items'),
    path('wishlist_cart_count/<int:id>', views.user_counts, name='wishlist_cart_count'),
    path('cart_list_show/', views.CartItemList.as_view(), name='cart_list_show'),
    path('cart_delete/<int:id>/', views.CartItemDelete.as_view(), name='cart-item-delete'),
    path('wish_list_show/', views.WishListItem.as_view(), name='wish_list_show'),
    path('wish_list_delete/<int:id>/', views.WishListItemDelete.as_view(), name='wish_list_delete'),
    path('initiate_payment/', views.initiate_payment, name='initiate-payment'),
    path('orders/', views.OrderListView.as_view(), name='order-list'),
    path('orders/<int:order_id>/invoice/', views.generate_invoice, name='generate_invoice')
]