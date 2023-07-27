from django.shortcuts import render

from rest_framework import viewsets

from .serializers import *

from .models import *



class SiteBookingView(viewsets.ModelViewSet):

    serializer_class = SiteBookingSerializer

    queryset = SiteBooking.objects.all()


