"""maptocanada URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from account.urls import router as accountRouter
from attachment.urls import router as attachmentRouter

urlpatterns = [
    path('attachment/', include('attachment.urls', namespace="views")),
    path('api/attachment/', include('attachment.urls', namespace="api")),
    path('api/attachment/', include(attachmentRouter.urls)),
]

# Public statics by Django
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += i18n_patterns(
    path('admin/', admin.site.urls),
    path('account/', include('account.urls')),
    path('api/account/', include('account.urls')),
    path('api/account/', include(accountRouter.urls)),
    path('api/archive/', include('archive.urls')),
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    prefix_default_language=True
)
