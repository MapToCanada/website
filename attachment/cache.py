import os
from django.conf import settings
from attachment.image import ImageUtil

class ImageFileCache():
    def __init__(self, path):
        self.path = path
        self.cached_name = False

    def load(self, width, height):
        self.cached_name = self.cache_name(width, height)

        # Original path
        self.o_path = os.path.join(settings.ATTACHMENTS_MEDIA, self.path)
        return self.cached_name

    def cache_name(self, width, height):
        path = self.path
        name, ext = os.path.splitext(path)
        cache_file = name + '.cache.' + str(width) + '_' + str(height) + ext
        return cache_file

    def cached_and_abs_path(self, width, height):
        cached_file = self.cached_name if self.cached_name else self.load(width, height)

        # Cached path
        abs_path = os.path.join(settings.IMAGE_CACHE_PATH, cached_file)
        return cached_file, abs_path

    def create(self, width, height):
        cached_file, abs_path = self.cached_and_abs_path(width, height)

        # Read original file and generate to thumbnail
        im = ImageUtil(self.o_path)
        image_data = im.get_thumb(width, height, save_to=abs_path)
        
        return image_data, im.content_type

    def has_cache(self, width, height):
        cached_file, abs_path = self.cached_and_abs_path(width, height)
        return os.path.isfile(abs_path)

    def get(self, width, height):
        # Return cached image data
        cached_file, abs_path = self.cached_and_abs_path(width, height)
        if os.path.isfile(abs_path):
            im = ImageUtil(abs_path)
            return im.get_data(), im.content_type
        else:
            return False, None
