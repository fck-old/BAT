from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.template import loader
from batapp.forms import PictureForm
from .models import Picture


@login_required
def upload_image(request):

    if request.method == 'POST':
        form = PictureForm(request.POST, request.FILES)
        if form.is_valid():
            picture = form.save()
            # picture.uploaded_by = request.user
            picture.save()
            return HttpResponse('upload successful')

    form = PictureForm()
    print("Hallo")
    return render(request, 'image.html', {'form': form})


@login_required
def get_all_images(request):

    pictures = Picture.objects.all()
    for p in pictures:
        print("Das steht in der Datenbank:")
        print(p.picture_path_file.url)
    return render(request, 'getimages.html', {'pictures': pictures})


def functionality(request):

    return render(request, 'functionality.html')
