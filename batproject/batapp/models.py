from django.db import models
#from django.contrib.auth.models import User


# Create your models here.
from accountapp.models import User


class StatusPicture(models.Model):
    status_type = models.CharField(max_length=20, default='tba')


class CoordHead(models.Model):
    nothing = models.IntegerField(default=-1)


class Picture(models.Model):
    picture_path_file = models.ImageField(upload_to='images/')
    label = models.CharField(max_length=200, default='add label')
    upload_date = models.DateTimeField('date uploaded', null=True)
    status = models.ForeignKey(StatusPicture, related_name='pictures', on_delete=models.CASCADE, null=True)
    uploaded_by = models.ForeignKey(User, related_name='uploaded', on_delete=models.CASCADE, null=True)
    tagged_by = models.ForeignKey(User, related_name='tagged', on_delete=models.CASCADE,  null=True)
    rect = models.ForeignKey(CoordHead, related_name='forpic', on_delete=models.CASCADE,  null=True)
    metadata_file = models.FileField(upload_to='metafiles/', null=True)


class Coord(models.Model):
    x = models.IntegerField()
    y = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    belongs_to_pic = models.ForeignKey(CoordHead, related_name='rectangles', on_delete=models.CASCADE)

class Muell(models.Model):
    status_type = models.CharField(max_length=20, default='tba')

class Testfilecreate(models.Model):
    metadata_file = models.FileField(upload_to='testfiles/', null=True)


