import re
from rest_framework import serializers
from django.contrib.auth.models import User


class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('last_login', 'username', 'email', 'is_active', 'is_staff', 'date_joined')

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(label='account', max_length=254, required=True)
    password = serializers.CharField(label='password', max_length=128, required=True)
