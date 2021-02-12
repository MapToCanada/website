import io
from django.http import HttpResponse
from account.utils.code import get_verify_code


def image_code(request):
    image, code = get_verify_code()
    buf = io.BytesIO()
    image.save(buf, 'jpeg')
    buf_str = buf.getvalue()
    response = HttpResponse(buf_str, content_type='image/gif')
    session = request.session
    session['image'] = code

    return response