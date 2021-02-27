import os
from io import BytesIO
from PIL import Image, ImageOps, ImageSequence
from django.conf import settings
from rest_framework import views
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.http import HttpResponse
from attachment.cache import ImageFileCache
from attachment.image import ImageUtil


class GetImage(views.APIView):
    # 传入文件路径、长宽获取图片
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, file_path, width, height):

        try:
            path = os.path.join(settings.ATTACHMENTS_MEDIA, file_path)
        except (TypeError):
            image_data = ImageUtil(settings.NO_THUMBNAIL_IMAGE).get_data()
            return HttpResponse(image_data, content_type="image/png")

        if int(width) == 0 or int(height) == 0:
            try:
                im = ImageUtil(path)
                image_data = im.get_data()
                return HttpResponse(image_data, content_type=im.content_type)
            except (IOError, FileNotFoundError):
                image_data = ImageUtil(settings.NO_THUMBNAIL_IMAGE).get_data()
                return HttpResponse(image_data, content_type="image/png")

        image_file_cache = ImageFileCache(file_path)
        image_data, image_content_type = image_file_cache.get(width, height)

        if not image_data or not image_content_type:
            try:
                image_data, image_content_type = image_file_cache.create(width, height)
            except (IOError, FileNotFoundError):
                path = os.path.join(settings.ATTACHMENTS_MEDIA, file_path)
                if not os.path.isfile(path):
                    path = os.path.join(settings.NO_THUMBNAIL_IMAGE)
                im = ImageUtil(path)
                image_data = im.get_thumb(width, height)
                image_content_type = im.content_type

        return HttpResponse(image_data, content_type=image_content_type)
