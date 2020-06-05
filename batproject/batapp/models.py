from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Picture(models.Model):
    picture_path_file = models.ImageField(upload_to='images/')
    uploaded_by = models.ForeignKey(User, related_name='uploaded')
