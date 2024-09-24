from django.contrib import admin
from . import models

admin.site.register(models.CartItem)
admin.site.register(models.WishlistItem)
admin.site.register(models.Category)
admin.site.register(models.Product)
admin.site.register(models.Order)
admin.site.register(models.OrderItem)