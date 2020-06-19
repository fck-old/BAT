from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.template import loader
from django.utils import timezone

from batapp.forms import PictureForm
from .models import Picture, StatusPicture


@login_required
def upload_image(request):

    if request.method == 'POST':
        form = PictureForm(request.POST, request.FILES)
        if form.is_valid():
            picture = form.save()
            # picture.uploaded_by = request.user
            picture.upload_date = timezone.now()
            #a = StatusPicture.objects.all()
            #for i in a:
                #i.delete()
            picture.status = StatusPicture.objects.get(status_type='untagged')
            print(picture.upload_date)
            picture.save()
            header_ut = StatusPicture.objects.get(status_type='untagged')
            header_ut.pictures.set(header_ut.pictures.order_by('-upload_date'))
            header_ut.save()
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
        # p.picture_path_file = 'http://127.0.0.1:8000/batapp' + p.picture_path_file.url # hier geaendert
        # print('Das wird zusammengefuegt:')
        # print('http://127.0.0.1:8000/batapp' + ([str)p.picture_path_file)  # hier geaendert
    return render(request, 'getimages.html', {'pictures': pictures})


def functionality(request):

    return render(request, 'functionality.html')


@login_required()
def initialise_status_types(request):

    s = StatusPicture(status_type='untagged')
    s.save()
    s = StatusPicture(status_type='in_progress')
    s.save()
    s = StatusPicture(status_type='tagged')
    s.save()
    return HttpResponse('initialising successful')

@login_required()
def get_untagged_picture(request):
    if request.user.last_picture == -1:
        untagged_p = StatusPicture.objects.get(status_type='untagged')
        in_progress_p = StatusPicture.objects.get(status_type='in_progress')
        pic = untagged_p.pictures.first()
        pic.status = in_progress_p
        pic.save()
        request.user.last_picture = pic.id
        request.user.save()
        return render(request, 'getimage.html', {'p': pic})
    
    else:
        untagged_p = StatusPicture.objects.get(status_type='untagged')
        in_progress_p = StatusPicture.objects.get(status_type='in_progress')
        last_pic = in_progress_p.pictures.get(id=request.user.last_picture)
        #date = last_pic.upload_date
        i_pic = untagged_p.pictures
        for p in i_pic:
            if p.upload_date > last_pic.upload_date:
                p.status = in_progress_p
                p.save()
                request.user.last_picture = p.id
                last_pic.status = untagged_p
                last_pic.save()
                untagged_p.pictures = untagged_p.pictures.order_by('-upload_date')
                untagged_p.save()                
                return render(request, 'getimages.html', {'pictures': p})
        request.user.last_picture = -1
        last_pic.status = untagged_p
        last_pic.save()
        untagged_p.pictures = untagged_p.pictures.order_by('-upload_date')
        untagged_p.save()
        """Fehler-Meldung muss noch gemacht werden"""
        return render(request, 'functionality.html')