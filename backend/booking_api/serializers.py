from rest_framework import serializers

from .models import *


class ParkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Park
        fields = ('id', 'name', 'address', 'postal_code', 'owner')

class SiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Site
        fields = ('id', 'name', 'park_name', 'price')

class SiteBookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = SiteBooking
        fields = ('id', 'park', 'site', 'start_date', 'end_date', 'payment_made')
