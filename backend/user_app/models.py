from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    mobile_number = models.CharField(max_length=15)
    address = models.TextField()
    is_verified = models.BooleanField(default=False)