import os
from io import BytesIO
from PIL import Image, ImageOps, ImageSequence

IMAGE_TYPES = {
    "jpg": "JPEG",
    "png": "PNG",
    "gif": "GIF",
}

# To add content types:
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
CONTENT_TYPES = {
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "jfif": "image/jpeg",
    "pjpeg": "image/jpeg",
    "pjp": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif",
}

class GIFError(Exception): pass

class ImageUtil():
    def __init__(self, path):
        self.path = path
        self.analyze()
        pass

    def analyze(self):
        name, ext = os.path.splitext(self.path)
        self.name = name
        self.ext = ext.replace('.', '')
        self.ext = self.ext.lower()
        if self.ext == 'jpeg' or self.ext == 'jfif' or self.ext == 'pjpeg' or self.ext == 'pjp':
            self.ext = 'jpg'

        self.content_type = CONTENT_TYPES[self.ext]

    def get_gif_num_frames(self):
        if self.ext != 'gif':
            return 0

        frames = 0

        with open(self.path, 'rb') as f:
            if f.read(6) not in ('GIF87a', 'GIF89a'):
                raise GIFError('not a valid GIF file')
            f.seek(4, 1)
            def skip_color_table(flags):
                if flags & 0x80: f.seek(3 << ((flags & 7) + 1), 1)
            flags = ord(f.read(1))
            f.seek(2, 1)
            skip_color_table(flags)
            while True:
                block = f.read(1)
                if block == ';': break
                if block == '!': f.seek(1, 1)
                elif block == ',':
                    frames += 1
                    f.seek(8, 1)
                    skip_color_table(ord(f.read(1)))
                    f.seek(1, 1)
                else: raise GIFError('unknown block type')
                while True:
                    l = ord(f.read(1))
                    if not l: break
                    f.seek(l, 1)
        return frames
    
    def get_data(self):
        im = Image.open(self.path)
        bytes_io = BytesIO()
        if self.ext == 'gif':
            im.save(bytes_io, IMAGE_TYPES[self.ext], save_all=True, loop=0)
        else:
            im.save(bytes_io, IMAGE_TYPES[self.ext])
        image_data = bytes_io.getvalue()
        return image_data

    def get_thumb(self, width, height, save_to=None):
        im = Image.open(self.path)
        bytes_io = BytesIO()
        size = int(width), int(height)
        
        if self.ext == 'gif':
            frames = []
            try:
                while 1:
                    im.seek(im.tell()+1)
                    thumb = ImageOps.fit(im, size, Image.ANTIALIAS)
                    frames.append(thumb)
            except EOFError:
                pass # end of sequence

            if len(frames) < 0:
                # Not a gif
                raise GIFError('not a valid GIF file')

            if len(frames) > 1:
                # Multiple frames
                frames[0].save(bytes_io, IMAGE_TYPES[self.ext], save_all=True, 
                    append_images=frames[1:], loop=0)
                if save_to != None:
                    frames[0].save(save_to, IMAGE_TYPES[self.ext], save_all=True, 
                        append_images=frames[1:], loop=0)
            
            else:
                # Single frame
                frames[0].save(bytes_io, IMAGE_TYPES[self.ext], save_all=True)
                if save_to != None:
                    frames[0].save(save_to, IMAGE_TYPES[self.ext], save_all=True)
        else:
            thumb = ImageOps.fit(im, size, Image.ANTIALIAS)
            thumb.save(bytes_io, IMAGE_TYPES[self.ext])
            if save_to != None:
                thumb.save(save_to, IMAGE_TYPES[self.ext])
        image_data = bytes_io.getvalue()
        return image_data
