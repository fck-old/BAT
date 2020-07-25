"""batproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from django.conf.urls import url
from django.urls import path
from django.contrib.auth import views as auth_views
from .forms import LoginForm


from accountapp import views as account_views

urlpatterns = [
    path('signup', account_views.signup, name='signup'),
    path('logout', auth_views.LogoutView.as_view(), name='logout'),
    path('login', auth_views.LoginView.as_view(template_name='accountapp/login.html', form_class=LoginForm), name='login'),
    path('changePassword', account_views.changePassword, name='changePassword'),
    path('changeProfile', account_views.changeProfile, name='changeProfile'),
    path('deleteAccount', account_views.deleteAccount, name='deleteAccount'),
]
