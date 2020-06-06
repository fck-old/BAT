from django.shortcuts import render

# Create your views here.


from django.contrib.auth import login as auth_login
from django.shortcuts import render
from django.http import HttpResponse
from .forms import SignUpForm


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        print("ist Form valide?")
        if form.is_valid():
            print("Form ist valide")
            form_bat_user = form.save()
            auth_login(request, form_bat_user)
            return render(request, 'signup.html', {'form': form})
    else:
        form = SignUpForm()
        print("gib html aus")
    return render(request, 'signup.html', {'form': form})


def home(request):
    return HttpResponse(request.user)
