import os
from maptocanada.settings import *
from corsheaders.defaults import default_headers

# Disable debugging and logging
DEBUG = True
LOGGING = {}

# Allow cross-site in Development
# https://pypi.org/project/django-cors-headers/
# corsheader
INSTALLED_APPS.append('corsheaders')
MIDDLEWARE.insert(2, 'corsheaders.middleware.CorsMiddleware')
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = list(default_headers) + [
    'referrer-policy',
    'type',
]
