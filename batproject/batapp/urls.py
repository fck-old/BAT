from django.urls import path

from . import views
from accountapp import views as account_views

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard', views.index, name='dashboard'),
    path('dashboard/feed', views.feed, name='feed'),
    path('dashboard/jobs', views.jobs, name='jobs'),
    
    path('dashboard/account', account_views.account, name='account'),
    path('dashboard/account/password', account_views.changePassword, name='changePassword'),
    path('dashboard/account/profile', account_views.changeProfile, name='changeProfile'),
    path('dashboard/account/delete', account_views.deleteAccount, name='deleteAccount'),
    
    path('help', views.functionality, name='functions'),
    path('upload', views.upload_image, name='upload'),
    path('getimages', views.get_all_images, name='getimages'),
    path('init', views.initialise_status_types, name='init'),
    path('untagged', views.get_untagged_picture, name='get_untagged'),
    path('getuserimages', views.get_images_uploaded_by_user, name='getuserimages'),
    path('getusertaggedimages', views.get_images_tagged_by_user, name='getusertaggedimages'),
    path('gettaggeduploadedbyuser', views.get_tagged_images_uploaded_by_user, name='gettaggeduploadedbyuser'),
    path('gettaggeduploadedbyuserjson', views.get_tagged_images_uploaded_by_user_json, name='gettaggeduploadedbyuserjson'),
    path('tag', views.tag, name='tag'),
    path('getall', views.get_all_images, name='getall'),
    path('deletepic', views.delete_picture, name='deletepic'),
    path('download', views.test_creating_metafile, name='download')
]

