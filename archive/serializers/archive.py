from rest_framework import serializers
from archive.models import ArchiveCategory, Category, Archive

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'user', 'title_cn', 'title_en', 'is_pub', 'ts_created', 'code', 'fid')


class ArchiveSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True, many=True)

    class Meta:
        model = Archive
        fields = ('id', 'user', 'title', 'description', 'content', 'author', 
        'ts_created', 'ts_publish', 'ts_changed', 'ts_publish', 'link',
        'is_publish', 'home_push', 'language', 'source', 'thumb', 'category')

class ArchiveCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchiveCategory
        fields = ('aid', 'cid')