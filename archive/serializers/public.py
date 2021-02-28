from rest_framework import serializers
from archive.models import ArchiveCategory, Category, Archive


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'user', 'title_cn', 'title_en', 'code', 'fid')


class ArchiveSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True, many=True)

    class Meta:
        model = Archive
        fields = ('id', 'user', 'title', 'description', 'content', 
                  'ts_publish', 'link', 'source', 'author',
                  'home_push', 'language', 'thumb', 'category')
