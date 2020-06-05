from django.urls import path

from . import views

urlpatterns = [
    path('upload/', views.upload_image, name='upload'),
    path('getimages/', views.get_all_images, name='getimages'),
]

