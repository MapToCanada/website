import re
import django_filters
import datetime
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import views, viewsets, permissions
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_204_NO_CONTENT
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from archive.serializers.archive import (ArchiveSerializer, ArchiveCategorySerializer, CategorySerializer)
from archive.models import Archive, ArchiveCategory, Category


class MyPageNumberPagination(PageNumberPagination):
    page_size_query_param = "pageSize"
    page_query_param = "page"


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('-ts_created')
    serializer_class = CategorySerializer
    pagination_class = MyPageNumberPagination

    def create(self, request, *args, **kwargs):
        data = request.data
        if Category.objects.filter(title_cn=data['title_cn']).exists():
            status = 0
        else:
            category_field = {
                'user': request.user,
                'title_cn': data['title_cn'],
                'title_en': data['title_en'],
                'code': data['code'],
                'is_pub': data['is_pub'],
            }

            # For DRF heck
            if category_field['is_pub'] == 'true':
                category_field['is_pub'] = True
            if category_field['is_pub'] == 'false':
                category_field['is_pub'] == False
        
            create_category = Category.objects.create(**category_field)
            # result = CategorySerializer(create_category)
            status = 1
        return Response({'status': status}, status=HTTP_201_CREATED)


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        data = {
            "id": instance.id
        }
        self.perform_destroy(instance)
        return Response(data, status=HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        data = request.data
        instance = self.get_object()
        category = Category.objects.filter(id=instance.id)

        exist_category = Category.objects.filter(title_cn=data['title_cn'])
        if exist_category.exists() and exist_category.first().id != instance.id:
            status = 0
        else:
            category_field = {
                'title_cn': data['title_cn'],
                'title_en': data['title_en'],
                'code': data['code'],
                'is_pub': data['is_pub'],
            }
            
            update_category = category.update(**category_field)
            status = 1
            
            
        return Response({'status': status})

class ArchiveCategoryViewSet(viewsets.ModelViewSet):
    queryset = ArchiveCategory.objects.all()
    serializer_class = ArchiveCategorySerializer


class ArchiveViewSet(viewsets.ModelViewSet):
    serializer_class = ArchiveSerializer
    pagination_class = MyPageNumberPagination

    def get_queryset(self):
        type = self.request.query_params.get('type', None)
        show_deleted = False
        if type == "trash":
            show_deleted = True
        return Archive.objects.filter(is_deleted=show_deleted).all().order_by('-ts_created')
    
    def create(self, request, *args, **kwargs):
        data = request.data
        data['user'] = request.auth.user.id
        if Archive.objects.filter(title=data['title']).exists():
            status = 0
        else:
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            status = 1
            if 'category' in data.keys():
                for c_id in data['category']:
                    category = Category.objects.get(id=c_id)
                    archive_id = serializer.data['id']
                    archive = Archive.objects.get(id=archive_id)
                    archive_category = {
                        'aid': archive,
                        'cid': category
                    }
                    ArchiveCategory.objects.create(**archive_category)
        return Response({'status': status}, status=HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        print(instance.is_deleted)
        if instance.is_deleted == True:
            instance.delete()
            return Response({'id': instance.id}, status=HTTP_200_OK)
        instance.is_deleted = True
        self.perform_update(instance)
        return Response({'id': instance.id}, status=HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        data = request.data
        instance = self.get_object()
        archive = Archive.objects.filter(id=instance.id)
        data['user'] = instance.user.id
        data['ts_changed'] = datetime.datetime.now()
        exist_archive = Archive.objects.filter(title=data['title'])
        if exist_archive.exists() and exist_archive.first().id != instance.id:
            status = 0
        else:
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            archive_id = serializer.data['id']
            archive = Archive.objects.get(id=archive_id)

            relat_archive_category = ArchiveCategory.objects.filter(aid=archive).all()
            if 'category' in data.keys():
                archive_categorys = ArchiveCategory.objects.filter(aid_id=archive_id).delete()
                for c_id in data['category']:
                    category = Category.objects.get(id=c_id)
                    archive_category = {
                        'aid': archive,
                        'cid': category
                    }
                    if not ArchiveCategory.objects.filter(**archive_category).exists():
                        ArchiveCategory.objects.create(**archive_category)
            status = 1
        return Response({'status': status}, status=HTTP_201_CREATED)