from django.urls import path

from . import views

urlpatterns = [
    path('upload/', views.upload_image, name='upload'),
    path('getimages/', views.get_all_images, name='getimages'),
    path('', views.functionality, name='functions'),
    path('init/', views.initialise_status_types, name='init'),
    #path('untagged/', views.get_untagged_picture, name='get_untagged')
]

