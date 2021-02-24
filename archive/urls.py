from django.conf.urls import url
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import include, path
from .restful import archive

router = routers.DefaultRouter()
router.register(r'archives', archive.ArchiveViewSet, basename="archives")
router.register(r'category', archive.CategoryViewSet, basename="category")
router.register(r'archives_category', archive.ArchiveCategoryViewSet, basename="archives_category")

urlpatterns = [
    url(r'', include(router.urls)),
]

urlpatterns += format_suffix_patterns([
])

urlpatterns += router.urls
