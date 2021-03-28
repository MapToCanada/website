from django.conf.urls import url
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import include, path
from .restful import archive, public

router = routers.DefaultRouter()

# For admin
router.register(r'archives', archive.ArchiveViewSet, basename="archives")
router.register(r'category', archive.CategoryViewSet, basename="category")
router.register(r'archives_category', archive.ArchiveCategoryViewSet, basename="archives_category")

# For users (Readonly)
router.register(r'categories', public.CategoryViewSet, basename="public_categories")
router.register(r'', public.ArchiveViewSet, basename="public_archives")

urlpatterns = [
    url(r'', include(router.urls)),
]

urlpatterns += format_suffix_patterns([
    path('a/<slug:link>/', public.ArchiveViewSet.as_view({'get': 'retrieve'}, lookup_field='link')),
])

urlpatterns += router.urls
