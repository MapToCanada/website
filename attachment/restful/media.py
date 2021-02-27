from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.pagination import PageNumberPagination
from attachment.models import Attachment
from attachment.serializer import AttachmentSerializer

class MyPageNumberPagination(PageNumberPagination):
    page_size_query_param = "pageSize"
    page_query_param = "page"


class MediaLibrary(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    pagination_class = MyPageNumberPagination
    serializer_class = AttachmentSerializer

    def get_queryset(self):
        return Attachment.objects.filter().order_by('-ts_created')

