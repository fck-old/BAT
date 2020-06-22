from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm
from django.contrib.auth.models import User
from .models import User

TAGGER_OR_UPLOADER = (
    ("tagger", "tagger"),
    ("uploader", "uploader"),
)


class SignUpForm(UserCreationForm):
    email = forms.CharField(max_length=254, required=True, widget=forms.EmailInput())

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')


class ChangeProfileForm(UserChangeForm):
    email = forms.CharField(max_length=254, required=True, widget=forms.EmailInput())
    first_name = forms.CharField(max_length=254, required=True, widget=forms.EmailInput())
    last_name = forms.CharField(max_length=254, required=True, widget=forms.EmailInput())

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')
