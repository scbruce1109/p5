import random
import os
from django.conf import settings
from django.db import models
from django.db.models.signals import pre_save
from django.db.models import Q
from django.urls import reverse
from p5.utils import unique_slug_generator

# Create your models here.

# class

class SketchManager(models.Manager):
    # def get_queryset(self):
    #     return NoteQuerySet(self.model, using=self._db)

    def all(self):
        return self.get_queryset()

    def new_or_get(self, title):
        created = False
        qs = self.get_queryset().filter(title=title)
        if qs.count() == 1:
            sketch_obj = qs.first()
            # print('yes qs')
        else:
            sketch_obj = Sketch.objects.create(title=title)
            created = True
        return (sketch_obj, created)

class Sketch(models.Model):
    title = models.CharField(max_length=120)
    slug = models.SlugField(blank=True, unique=True)

    objects = SketchManager()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("sketch-detail", kwargs={"slug": self.slug})



def sketch_pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)

pre_save.connect(sketch_pre_save_receiver, sender=Sketch)
