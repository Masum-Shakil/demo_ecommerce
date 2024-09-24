from django.urls import path
from .views import UserRegistrationView, EmailVerificationView, LoginView, UserView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-email/<int:pk>/', EmailVerificationView.as_view(), name='verify_email'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/<int:pk>/', UserView.as_view(), name='user_information')
]