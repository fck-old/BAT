from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from batapp.forms import PictureForm


def upload_image(request):

    if request.method == 'POST':
        form = PictureForm(request.POST, request.FILES)
        if form.is_valid():
            picture = form.save()
            # picture.uploaded_by = request.user
            picture.save()
            return HttpResponse('upload successful')

        else:
            form = PictureForm()
            return render(request, 'image.html', {'form': form})
