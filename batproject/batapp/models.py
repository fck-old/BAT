from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class StatusPicture(models.Model):
    status_type = models.CharField(max_length=20, default='tba')


class Picture(models.Model):
    picture_path_file = models.ImageField(upload_to='images/')
    label = models.CharField(max_length=200, default='add label')
    upload_date = models.DateTimeField('date uploaded')
    status = models.ForeignKey(StatusPicture, related_name='pictures', on_delete=models.CASCADE)
    #uploaded_by = models.ForeignKey(User, related_name='uploaded')



