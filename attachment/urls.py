from django.conf.urls import url
from attachment.restful import upload, image, media
from rest_framework import routers
from django.urls import include

app_name = 'attachment'

router = routers.DefaultRouter()

router.register(r'media', media.MediaLibrary, basename="media_library")

urlpatterns = [
    url(r'', include(router.urls)),
    url(r'upload', upload.Upload.as_view()),
    url(r'^image/(\S+)/(\d+)/(\d+)/', image.GetImage.as_view(), name='attach_image'),
]

urlpatterns += router.urls
