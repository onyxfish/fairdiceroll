from django.conf.urls.defaults import *

from api import views as api_views

#handler500 = 'djangotoolbox.errorviews.server_error'

urlpatterns = patterns('',
    ('^api/roll', api_views.roll),
)
