import json

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.template import loader
from django.utils import timezone

from batapp.forms import PictureForm
from .models import Picture, StatusPicture, Muell, Coord, CoordHead


def index(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request, 'batapp/index.html')


@login_required
def dashboard(request):
    return render(request, 'batapp/dashboard.html')



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
            picture.uploaded_by = request.user
            c = CoordHead.objects.create()
            picture.rect = c
            print(picture.upload_date)
            picture.save()
            #header_ut = StatusPicture.objects.get(status_type='untagged')
            #header_ut.pictures.set(header_ut.pictures.order_by('-upload_date'))
            #header_ut.save()
            return HttpResponse('upload successful')

    form = PictureForm()
    #print("Hallo")
    return render(request, 'image.html', {'form': form})


@login_required
def get_all_images(request):

    pictures = Picture.objects.all()
    #for p in pictures:
        #print("Das steht in der Datenbank:")
        #print(p.picture_path_file.url)
        #print("Und das ist die id des Bildes:")
        #print(p.id)
        # p.picture_path_file = 'http://127.0.0.1:8000/batapp' + p.picture_path_file.url # hier geaendert
        # print('Das wird zusammengefuegt:')
        # print('http://127.0.0.1:8000/batapp' + ([str)p.picture_path_file)  # hier geaendert
    return render(request, 'getimages.html', {'pictures': pictures})


@login_required()
def get_images_uploaded_by_user(request):

    pictures = Picture.objects.filter(uploaded_by=request.user)

    return render(request, 'getimages.html', {'pictures': pictures})


@login_required()
def get_images_tagged_by_user(request):

    pictures = Picture.objects.filter(tagged_by=request.user)
    if pictures.first() is None:
        return HttpResponse('no pictures found')

    return render(request, 'getimages.html', {'pictures': pictures})


def functionality(request):

    return render(request, 'functionality.html')


@login_required()
def initialise_status_types(request):

    """if Muell.objects.first() is None:
        return HttpResponse('Muell is None')"""

    if StatusPicture.objects.first() is not None:
        return HttpResponse('already initialised')
    s = StatusPicture(status_type='untagged')
    s.save()
    t = StatusPicture(status_type='in_progress')
    t.save()
    u = StatusPicture(status_type='tagged')
    u.save()
    return HttpResponse('initialising successful')

@login_required()
def get_untagged_picture(request):
    if request.user.last_picture == -1:
        untagged_p = StatusPicture.objects.get(status_type='untagged')
        in_progress_p = StatusPicture.objects.get(status_type='in_progress')
        pic = untagged_p.pictures.order_by('upload_date').first()
        pic.status = in_progress_p
        pic.save()
        request.user.last_picture = pic.id
        request.user.save()
        return render(request, 'getimage.html', {'p': pic})
    
    else:
        print("Nummer des letzten Bildes:")
        print(request.user.last_picture)
        untagged_p = StatusPicture.objects.get(status_type='untagged')
        in_progress_p = StatusPicture.objects.get(status_type='in_progress')
        #picture_list = Picture.objects.all()
        last_pic = in_progress_p.pictures.get(id=request.user.last_picture)
        #date = last_pic.upload_date
        new_pic = untagged_p.pictures.filter(upload_date__gt=last_pic.upload_date).order_by('upload_date').first()
        if new_pic is not None:
            new_pic.status = in_progress_p
            new_pic.save()
            request.user.last_picture = new_pic.id
            request.user.save()
            last_pic.status = untagged_p
            last_pic.save()
            #untagged_p.pictures = untagged_p.pictures.order_by('-upload_date')
            #untagged_p.save()
            return render(request, 'getimage.html', {'p': new_pic})
        request.user.last_picture = -1
        request.user.save()
        last_pic.status = untagged_p
        last_pic.save()
        print("Letztes Bild jetzt:")
        print(request.user.last_picture)
        #untagged_p.pictures = untagged_p.pictures.order_by('-upload_date')
        #untagged_p.save()
        return HttpResponse('{"url": "", "label": "", "image": false}')

@login_required()
def save_rectangle(request):
    data = request.POST
    #data = json.loads(data_un)
    Coord.objects.create(x=data['x'], y=data['y'], width=data['width'], height=data['height'], belongs_to_pic=request.user.last_picture.rect)
    in_progress_p = StatusPicture.objects.get(status_type='in_progress')
    tagged_p = StatusPicture.objects.get(status_type='tagged')
    pic = in_progress_p.pictures.filter(id=request.user.last_picture)
    pic.status = tagged_p
    pic.tagged_by = request.user
    request.user.last_picture = -1
    #data['id']
    return HttpResponse('Saving successful')