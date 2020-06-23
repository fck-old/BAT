from pyexpat.errors import messages

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserChangeForm, PasswordChangeForm
from django.shortcuts import render, redirect

# Create your views here.


from django.contrib.auth import login as auth_login, update_session_auth_hash
from django.shortcuts import render
from django.http import HttpResponse
from .forms import SignUpForm, ChangeProfileForm
from .models import User


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        print("ist Form valide?")
        if form.is_valid():
            print("Form ist valide")
            form_bat_user = form.save()
            auth_login(request, form_bat_user)
            context = {'username': request.user.username, 'email': request.user.email}
            return render(request, 'user.html', context)
    else:
        form = SignUpForm()
        print("gib html aus")
    return render(request, 'accountapp/signup.html', {'form': form})


@login_required
def changePassword(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            context = {'username': request.user.username, 'email': request.user.email}
            return render(request, 'user.html', context)
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'changePassword.html', {'form': form})


@login_required
def changeProfile(request):
    if request.method == 'POST':
        form = ChangeProfileForm(request.POST)
        if form.is_valid():
            user = User.objects.get(username=request.user.username)
            user.email = form.cleaned_data['email']
            user.first_name = form.cleaned_data['first_name']
            user.last_name = form.cleaned_data['last_name']
            user.save()
            update_session_auth_hash(request, user)
            return render(request, 'user.html', None)
    else:
        form = ChangeProfileForm()
    return render(request, 'changeProfile.html', {'form': form})


@login_required
def deleteAccount(request):
    if request.method == 'POST':
        u = User.objects.get(username=request.user.username)
        u.delete()
        return render(request, 'functionality.html', None)
    else:
        return render(request, 'deleteAccount.html', None)


def home(request):
    return HttpResponse(request.user)
