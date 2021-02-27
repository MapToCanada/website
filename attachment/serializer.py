from datetime import datetime
from django.contrib.auth.models import User
from rest_framework import serializers
from attachment.models import Attachment


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ('id', 'url', 'owner', 'origin_name', 'file_type', 'ts_created')
