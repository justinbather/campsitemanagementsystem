from django.urls import path, include
 
from . import views
 
from rest_framework import routers

router = routers.DefaultRouter()

#router.register(r'tasks',views.TodoView, 'task')
router.register(r'sitebooking', views.SiteBookingView, 'sitebooking')

urlpatterns = [
    path('sitebooking/', include(router.urls))

 
 
]