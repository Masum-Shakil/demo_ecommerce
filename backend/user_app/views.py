from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .serializers import UserRegistrationSerializer, LoginSerializer, UserSerializer

def send_verification_email(user):
    send_mail(
        'Verify your email',
        f'Click this link to verify your email for demo ecommerce: {settings.FRONTEND_URL}verified/{user.id}',
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
    )

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        send_verification_email(user)

class EmailVerificationView(generics.GenericAPIView):
    def get(self, request, pk):
        user = CustomUser.objects.get(pk=pk)
        user.is_verified = True
        user.save()
        return Response({'message': 'Email verified successfully.'})

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = CustomUser.objects.get(email=serializer.validated_data['email'])

        if not user.is_verified:
            return Response({'error': 'Email not verified.'}, status=400)

        if user.check_password(serializer.validated_data['password']):
            return Response({'message': 'Login successful!', 'user_id' : user.id})
        
        return Response({'error': 'Invalid credentials.'}, status=400)
    
class UserView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer