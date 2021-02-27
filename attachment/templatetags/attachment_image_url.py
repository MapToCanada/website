#
# To ref a url of a uploaded image
# If there is no cache of a image, create and output it.
#
# Use:
# {% load attachment_image_url %}
# 
# <img src="{% attachment_image_url archive.thumbnail width=320 height=180 %}" alt="{{ archive.title }}" title="{{ archive.title }}" />
#
import os
from django import template
from django.conf import settings
from django.core.cache import cache
from django.urls import reverse
from attachment.cache import ImageFileCache

register = template.Library()

class ImageUrl():
    def __init__(self, path):
        self.path = path
        pass

    def api_url(self, width, height):
        return reverse('attachment:attach_image', args=[self.path, width, height])

    def original_exists(self):
        try:
            self.original_path = os.path.join(settings.ATTACHMENTS_MEDIA, self.path)
            
            if not os.path.isfile(self.original_path):
                return False

            return True
        except (TypeError):
            return False

    def static_url(self):
        return settings.MEDIA_URL + self.path


@register.simple_tag
def attachment_image_url(path, *args, **kwargs):
    """
    判断是从缓存输出图片还是从动态地址输出图片
    """
    width = kwargs['width'] if 'width' in kwargs else None
    height = kwargs['height'] if 'height' in kwargs else None

    # print("==================", '--')
    # print(path, width, height)
    # print('^^^^^^^^^^^^^^^^^^^^^^^')

    if path is not None:
        image_file_cache = ImageFileCache(path)
        image_file_cache.load(width, height)
        if image_file_cache.has_cache(width, height):
            return ImageUrl(image_file_cache.cached_name).static_url()

    iu = ImageUrl(path)
    if not iu.original_exists():
        return settings.NO_THUMBNAIL_URL
    else:
        return iu.api_url(width, height)
