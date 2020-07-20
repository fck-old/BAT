from django import forms
from .models import *


class PictureForm(forms.ModelForm):

    class Meta:
        model = Picture
        fields = ['picture_path_file', 'label']


class PictureDeleteForm(forms.Form):
    pic_id = forms.IntegerField()
