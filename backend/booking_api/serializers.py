from rest_framework import serializers
import datetime

from . import validators
from .models import *


class ParkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Park
        fields = ('id', 'name', 'address', 'postal_code', 'owner')

class SiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Site
        fields = ('__all__')

class SiteBookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = SiteBooking
        fields = ('id', 'park', 'site_id', 'start_date', 'end_date', 'payment_made')

class CreateSiteBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteBooking
        fields = ('site_id', 'start_date', 'end_date', 'payment_made')

class SiteImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteImage
        fields = ('__all__')



