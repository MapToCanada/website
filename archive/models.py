import datetime
from django.db import models
import uuid
from django.contrib.auth.models import User


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title_cn = models.CharField(max_length=50, blank=True, null=True)
    title_en = models.CharField(max_length=50, blank=True, null=True)
    ts_created = models.DateTimeField(auto_now=True)
    is_pub = models.BooleanField(null=True, blank=True)
    code = models.CharField(max_length=32, blank=True, null=True)
    fid = models.CharField(max_length=32, blank=True, null=True)

    class Meta:
        db_table = 'category'


class Archive(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, blank=True, null=True)
    link = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(max_length=500, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    author = models.TextField(blank=True, null=True)
    ts_created = models.DateTimeField(auto_now_add=True)
    ts_changed = models.DateTimeField(auto_now=False, blank=True, null=True)
    is_publish = models.BooleanField('是否发布', default=False)
    ts_publish = models.DateTimeField(auto_now=False, blank=True, null=True)
    home_push = models.BooleanField('是否首页推送', default=False)
    language = models.CharField(max_length=32, blank=True, null=True)
    hit_count = models.IntegerField('点击量', default=0)
    source = models.TextField(max_length=5000, null=True, blank=True)
    thumb = models.CharField('缩略图', max_length=128, blank=True, null=True)
    is_deleted = models.BooleanField('Deleted', default=False)
    category = models.ManyToManyField(Category, related_name='category', through='ArchiveCategory', blank=True)

    def save(self, *args, **kwargs):
        if not kwargs.pop('skip_changed', False):
            self.ts_changed = datetime.datetime.now()

        super(Archive, self).save(*args, **kwargs)

    class Meta:
        db_table = 'archive'


class ArchiveI18n(models.Model):
    archive = models.ForeignKey(Archive, on_delete=models.CASCADE)
    language = models.CharField('语言', max_length=50, blank=True)
    title = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(max_length=500, blank=True, null=True)
    content = models.TextField(max_length=5000, blank=True, null=True)
    author = models.TextField(blank=True, null=True)
    ts_created = models.DateTimeField(auto_now_add=True)
    ts_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'archive_i18n'


class ArchiveCategory(models.Model):
    aid = models.ForeignKey(Archive, on_delete=models.CASCADE)
    cid = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        db_table = 'archive_category'
        unique_together = ('aid', 'cid')
