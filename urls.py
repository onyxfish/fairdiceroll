from django.conf.urls.defaults import *
from api import views as api_views

urlpatterns = patterns('',
    ('^$', 'django.views.generic.simple.direct_to_template', {'template': 'home.html'}),
    ('^api/roll', api_views.roll),
    ('^api/recall/(?P<id>.*)', api_views.recall),
)
