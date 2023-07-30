from rest_framework import serializers

from .models import *


class ParkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Park
        fields = ('id', 'name', 'address', 'postal_code', 'owner')

class SiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Site
        fields = ('id', 'name', 'park_id', 'price')

class SiteBookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = SiteBooking
        fields = ('id', 'park', 'site_id', 'start_date', 'end_date', 'payment_made')

class CreateSiteBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteBooking
        fields = ('site_id', 'start_date', 'end_date', 'payment_made')
