from datetime import datetime
from random import randint

from django.core.cache import cache
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.utils import simplejson as json

from api.models import Roll

DICE = {'d4': 4, 'd6': 6, 'd8': 8, 'd10': 10, 'd12': 12, 'd20': 20}

def roll(request):
    """
    Generate dice rolls for any number of standard size dice.
    """
    requested_dice = {}

    for die in DICE.keys(): 
        if die in request.REQUEST:
            requested_dice[die] = int(request.REQUEST.get(die))

    results = {}

    for die, count in requested_dice.items():
        results[die] = [randint(1, DICE[die]) for i in range(count)]

    results['sum'] = sum([sum(v) for v in results.values()])

    now = datetime.utcnow()

    results['timestamp'] = now.isoformat()

    roll = Roll.objects.create(results=results, timestamp=now)
    results['id'] = roll.id

    cache.add(Roll.get_cache_key(roll.id), results)

    return HttpResponse(json.dumps(results))

def recall(request, id):
    """
    Recall any previous dice roll.
    """
    results = cache.get(Roll.get_cache_key(id))

    if not results:
        roll = get_object_or_404(Roll, pk=id)
        results = roll.results

        cache.add(Roll.get_cache_key(id), results)

    return HttpResponse(json.dumps(results))
