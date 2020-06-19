from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    last_picture = models.IntegerField(default=-1)


class Muell(models.Model):
    muellzeille = models.IntegerField(default=-1)

