from django.db import models
import jsonfield


class Image(models.Model):
    image = models.ImageField()
    meta = jsonfield.JSONField()

    def __str__(self):
        return self.image.url
