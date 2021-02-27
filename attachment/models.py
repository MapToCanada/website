import uuid
from django.db import models
from django.contrib.auth.models import User

class Attachment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.CharField(max_length=100, null=False, blank=False)
    owner = models.ForeignKey(User, related_name='attachment_owner', on_delete=models.CASCADE)
    origin_name = models.CharField(max_length=50, null=False, blank=False)
    file_type = models.CharField(max_length=15, null=False, blank=False, default='other')
    ts_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'attachment'