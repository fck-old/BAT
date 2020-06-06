from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
"""from .models import User"""

TAGGER_OR_UPLOADER = (
    ("1", "tagger"),
    ("2", "uploader"),
)


class SignUpForm(UserCreationForm):
    email = forms.CharField(max_length=254, required=True, widget=forms.EmailInput())
    role = forms.ChoiceField(choices=TAGGER_OR_UPLOADER)

    class Meta:
        model = User
        fields = ('username', 'email', 'role', 'password1', 'password2')
