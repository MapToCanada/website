import os
import uuid
from datetime import datetime
from django.conf import settings
from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from attachment.serializer import AttachmentSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache

TYPE_PATH = {
    'image': settings.ATTACHMENTS_MEDIA_IMAGES,
    'video': settings.ATTACHMENTS_MEDIA_VIDEOS,
    'audio': settings.ATTACHMENTS_MEDIA_AUDIOS,
    'other': settings.ATTACHMENTS_MEDIA_OTHERS,
}

TYPE_URL = {
    'image': settings.MEDIA_IMAGES_URL,
    'video': settings.MEDIA_VIDEO_URL,
    'audio': settings.MEDIA_AUDIO_URL,
    'other': settings.MEDIA_OTHER_URL,
}


class Upload(views.APIView):
    permission_classes = (IsAuthenticated,)

    def get_ext(self, file_name):
        _, ext = os.path.splitext(file_name)
        ext = ext.replace('.', '').lower()
        if ext == 'jpeg':
            ext = 'jpg'
        return ext

    def file_type(self, ext):
        type_dict = {
            "png": "image",
            "jpg": "image",
            "gif": "image",
            "mp4": "video",
            "mp3": "audio",
        }
        return type_dict.get(ext, "other")

    def get_save_dir(self, file_obj, save_dir):
        ext = self.get_ext(file_obj.name)
        save_path = os.path.join(TYPE_PATH[self.file_type(ext)], save_dir)
        if not os.path.isdir(save_path):
            os.makedirs(save_path)
        return save_path

    def get_url_path(self, ext, save_dir):
        return TYPE_URL[self.file_type(ext)] + save_dir

    def save_image(self, file_obj):
        ext = self.get_ext(file_obj.name)
        filename = str(uuid.uuid4()) + '.' + ext

        save_dir = datetime.now().strftime("%Y%m%d")

        base_path = self.get_save_dir(file_obj, save_dir)
        file_path = os.path.join(base_path, filename)

        with open(file_path, 'wb+') as destination:
            for chunk in file_obj.chunks():
                destination.write(chunk)

        url = self.get_url_path(ext, save_dir) + '/' + filename
        file_type = self.file_type(ext)
        return url, file_path, filename, file_type

    # 上传文件，并返回保存地址
    @method_decorator(never_cache)
    def post(self, request):
        uploaded_file = request.FILES.get('file')
        if not uploaded_file:
            return Response({"file": ["Please select file(s) to upload.", ]}, status=HTTP_400_BAD_REQUEST)
        saved_url, saved_path, file_name, file_type = self.save_image(uploaded_file)

        save_id = file_name.split('.')[0]
        save_name = uploaded_file.name[0, 50] if len(uploaded_file.name) > 50 else uploaded_file.name

        att_ser = AttachmentSerializer(data={"id": save_id, "origin_name": save_name, 
                                        "url": saved_url, "owner": self.request.user.id,
                                        "file_type": file_type})
        if att_ser.is_valid():
            att_ser.save()
        else:
            print(att_ser.errors)

        return Response(saved_url, HTTP_201_CREATED)
