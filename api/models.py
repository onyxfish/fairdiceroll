from django.db import models

from lib.fields import JSONField

class Roll(models.Model):
    results = JSONField()
    timestamp = models.DateTimeField()

    @classmethod
    def get_cache_key(cls, id):
        return 'roll-%s' % id
