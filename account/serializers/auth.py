from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(label='account', max_length=254, required=True)
    password = serializers.CharField(label='password', max_length=128, required=True)