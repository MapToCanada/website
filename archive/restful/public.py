import re
import django_filters
import datetime
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from archive.serializers.public import (ArchiveSerializer, CategorySerializer)
from archive.models import Archive, Category


class MyPageNumberPagination(PageNumberPagination):
    page_size_query_param = "pageSize"
    page_query_param = "page"


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny, ]
    serializer_class = CategorySerializer
    pagination_class = MyPageNumberPagination

    def get_queryset(self):
        return Category.objects.filter(is_pub=True).all().order_by('-ts_created')


class ArchiveViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny, ]
    serializer_class = ArchiveSerializer
    pagination_class = MyPageNumberPagination

    def get_queryset(self):
        # Keywords
        # k = self.request.query_params.get('k', None)
        # if k is not None:
        return Archive.objects.filter(is_deleted=False, is_publish=True).all().order_by('-ts_created')
