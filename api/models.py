from django.db import models

from lib.fields import JSONField

class Roll(models.Model):
    results = JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)
