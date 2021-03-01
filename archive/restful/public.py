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
        language = self.request.LANGUAGE_CODE

        filter_kawgs = {
            "language": language,
            "is_deleted": False,
            "is_publish": True
        }

        # Category
        c = self.request.query_params.get('c', None)
        if c is not None:
            category = Category.objects.filter(code=c).first()
            filter_kawgs["category"] = category

        # Keywords
        # k = self.request.query_params.get('k', None)
        # if k is not None:

        return Archive.objects.filter(**filter_kawgs).all().order_by('-ts_created')