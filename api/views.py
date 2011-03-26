from random import randint

from django.conf import settings
from django.http import HttpResponse
from django.utils import simplejson as json

from api.models import Roll

DICE = {'d4': 4, 'd6': 6, 'd8': 8, 'd10': 10, 'd12': 12, 'd20': 20}

def roll(request):
    """
    Generate dice rolls for any number of standard size dice.
    """
    context = { 'settings': settings }

    requested_dice = {}

    for die in DICE.keys(): 
        if die in request.REQUEST:
            requested_dice[die] = int(request.REQUEST.get(die))

    results = {}

    for die, count in requested_dice.items():
        results[die] = [randint(1, DICE[die]) for i in range(0, count)]

    results['sum'] = sum([sum(v) for v in results.values()])

    return HttpResponse(json.dumps(results))

def recall(request):
    """
    Recall any previous dice roll.
    """
    pass
