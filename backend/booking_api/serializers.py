from rest_framework import serializers
import datetime

from . import validators
from .models import *


class ParkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Park
        fields = ('__all__')

class AmenitiesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Amenities
        fields = ('__all__')

class SiteSerializer(serializers.ModelSerializer):

    amenities = AmenitiesSerializer(many=True, read_only=True)

    class Meta:
        model = Site
        fields = ('id', 'name', 'park_id', 'amenities', 'price', 'thumbnail')

class SiteBookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = SiteBooking
        fields = ('id', 'park', 'site_id', 'start_date', 'end_date', 'payment_made')

class BookingObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = SiteBooking
        fields = ('__all__')

class CreateSiteBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteBooking
        fields = ('site_id', 'start_date', 'end_date', 'payment_made')

class SiteImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteImage
        fields = ('__all__')

class UnavailableDatesSerializer(serializers.Serializer):
    dates = serializers.ListField(child=serializers.DateField(format='%Y-%m-%d')) #Serializer a list of datefields in correct format




