"""
Django settings for maptocanada project.

Generated by 'django-admin startproject' using Django 3.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os
from django.utils.translation import ugettext_lazy as _

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '67!lp%lioia(#6ok*m67-ufetz26tugl(k*do%##%d!1p%*wdf'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["*"]
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'portal',
    'account',
    'archive',
    'attachment',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'maptocanada.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'maptocanada.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PWD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT'),
        'TEST': {
            'NAME': os.environ.get('TEST_DB_NAME')
        },
    }
}

AUTHENTICATION_BACKENDS = (
    'account.utils.account_backend.EmailOrUsernameBackend',
)


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

LANGUAGES = (
    ('en-us', _('English')),
    ('zh-hans', _('Simplified Chinese')),
)

# Optimize
DATA_UPLOAD_MAX_MEMORY_SIZE = 41943040

SESSION_SAVE_EVERY_REQUEST = True
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/
# USE_X_FORWARDED_HOST = True
# FORCE_SCRIPT_NAME="/"
STATIC_URL = '/static/'
# https://docs.djangoproject.com/en/3.1/ref/settings/#static-root
STATIC_ROOT = '/statics'

# STATICFILES_DIRS = [
#     "/statics"
# ]

# Django webpack loader (pipenv install django-webpack-loader)
# WEBPACK_LOADER = {
#     'DEFAULT': {
#         'CACHE': not DEBUG,
#         'BUNDLE_DIR_NAME': 'assets/',  # must end with slash
#         'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
#         'POLL_INTERVAL': 0.1,
#         'TIMEOUT': None,
#         'IGNORE': [r'.+\.hot-update.js', r'.+\.map'],
#         'LOADER_CLASS': 'webpack_loader.loader.WebpackLoader',
#     }
# }

# https://docs.djangoproject.com/en/3.1/ref/settings/#media-url
MEDIA_URL = "/media/"

DATA_DIR = "/data"
ATTACHMENTS_PATH = os.path.join(DATA_DIR, 'attachments')
ATTACHMENTS_MEDIA = os.path.join(ATTACHMENTS_PATH, 'media')

MEDIA_ROOT = ATTACHMENTS_MEDIA

# For account app
FONT_FILE = "resources/fonts/Geneva.dfont"
ERROR_ACCOUNT_USERNAME = ['username', 'user', 'name', 'password', 'passwd', 'null', 'none', 'blank', 'true', 'false',
                          'drop', 'delete', 'update', 'create', 'alert', 'admin', 'root']

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'formatter': 'verbose',
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': '/data/logs/debug.log',
            'when': 'midnight',
            'interval': 1
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

# Django Rest Framework
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAdminUser',
    ],
}

# Attachments
MEDIA_URL = '/media/'
MEDIA_IMAGES_URL = 'images/'
MEDIA_VIDEO_URL = 'videos/'
MEDIA_AUDIO_URL = 'audios/'
MEDIA_OTHER_URL = 'others/'

ATTACHMENTS_PATH = os.path.join(DATA_DIR, 'attachments')
ATTACHMENTS_MEDIA = os.path.join(ATTACHMENTS_PATH, 'media')

ATTACHMENTS_MEDIA_IMAGES = os.path.join(ATTACHMENTS_PATH, 'media', 'images')
ATTACHMENTS_MEDIA_VIDEOS = os.path.join(ATTACHMENTS_PATH, 'media', 'videos')
ATTACHMENTS_MEDIA_AUDIOS = os.path.join(ATTACHMENTS_PATH, 'media', 'audios')
ATTACHMENTS_MEDIA_OTHERS = os.path.join(ATTACHMENTS_PATH, 'media', 'others')
AVATAR_PATH = os.path.join(ATTACHMENTS_PATH, 'avatar')

# For thumbnail and cache, don't need to backup
IMAGE_CACHE_PATH = os.path.join(ATTACHMENTS_PATH, 'cache')

# Save no-thumb.png to the resources and the static dir, both of them.
NO_THUMBNAIL_IMAGE = os.path.join(BASE_DIR, 'resources', 'images', 'no-thumb.png')
NO_THUMBNAIL_URL = '/static/images/no-thumb.png'
