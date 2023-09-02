from django.urls import path, include
 
from . import views
 
from rest_framework import routers

router = routers.DefaultRouter()


#router.register(r'sitebooking', views.SiteBookingView, 'sitebooking')
#router.register(r'park', views.ParkView, 'park')

urlpatterns = [
    path('', include(router.urls)),
    #path('park/', views.ParkView.as_view(), name='park'),
    path('park/<int:park_id>', views.ParkView.as_view()),
    #path('site', views.SiteView.as_view()),
    path('site/<int:site_id>', views.SiteView.as_view()),
    path('bookings/<int:park_id>/<str:arrival>/<str:departure>', views.SiteBookingView.as_view()),
    path('unavailabledates/<int:park_id>/<int:site_id>/<str:current_date>', views.UnavailableDatesView.as_view()),
    path('siteimage/<int:site_id>', views.SiteImageView.as_view()),
    path('bookings/payment', views.StripeCheckoutSession.as_view()),
    path('bookings/payment/success/<int:booking_id>', views.CheckoutSuccess),
    path('bookings/payment/info/<int:booking_id>', views.BookingObjectView.as_view()),
    path('webhook-test/', views.WebhookTest.as_view()),

    #path('bookings/<int:park_id>/<int:site_id>', views.SiteBookingView.as_view()),

    #path('park/<int:park_id>', views.ParkView.as_view(), name='park'),
    

 
 
]