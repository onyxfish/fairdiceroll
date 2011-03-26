from django.db import models

from lib.fields import JSONField

class Roll(models.Model):
    results = JSONField()
    timestamp = models.DateTimeField()

    @staticmethod
    def get_cache_key(id):
        return 'roll-%s' % id
