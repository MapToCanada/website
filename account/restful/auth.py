from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.contrib.auth import authenticate, login, logout
from rest_framework import status, views
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from account.serializers.serializers import LoginSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User


class Login(views.APIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)

    @method_decorator(never_cache)
    def post(self, request):
        credentials = LoginSerializer(data=request.data)

        if not credentials.is_valid():
            return Response(credentials.errors, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request=request,
                            username=credentials.validated_data.get('email'),
                            password=credentials.validated_data.get('password'))
        if not user or user is None:
            return Response({'err': 'uname_or_pwd'}, status=status.HTTP_401_UNAUTHORIZED)

        token = Token.objects.get_or_create(user=user)

        login(request, user)

        response_data = {
            'username': user.username,
            'email': user.email,
            'date_joined': user.date_joined,
            'id': user.id,
            'token': token[0].key,
        }

        # If the login user is not a staff, do not send is_staff in response
        if user.is_staff:
            response_data['is_staff'] = user.is_staff

        return Response(response_data, status=status.HTTP_200_OK)

class Validate(views.APIView):
    permission_classes = (AllowAny,)

    @method_decorator(never_cache)
    def get(self, request):
        if not request.auth or not request.auth.user:
            return Response("login invalid", status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(username=request.auth.user).first()

        result = {
            'username': user.username,
            'email': user.email,
            'data_joined': user.date_joined,
            'id': user.id,
            'token': request.auth.key,
        }

        if user.is_staff == True:
            result['is_staff'] = user.is_staff
        
        return Response(result, status.HTTP_200_OK)


class SignOut(views.APIView):
    authentication_classes = ()
    permission_classes = (AllowAny,)

    @method_decorator(never_cache)
    def post(self, request):
        logout(request)
        return Response({'status': '√'}, status=status.HTTP_200_OK)