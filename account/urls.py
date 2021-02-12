from django.conf.urls import url
from django.urls import path
from account.restful import auth, captcha
from rest_framework import routers, urlpatterns

router = routers.DefaultRouter()

urlpatterns = urlpatterns.format_suffix_patterns([
    # Auth
    url(r'^login/$', auth.Login.as_view(), name='login'),
    url(r'^validate/$', auth.Validate.as_view(), name='validate'),
    url(r'^signout/$', auth.SignOut.as_view(), name='sign_out'),

    # captcha
    path(r'jpgcode/', captcha.image_code, name='captcha_code'),
])
