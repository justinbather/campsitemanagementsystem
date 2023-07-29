from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

from .serializers import ParkSerializer, SiteBookingSerializer, SiteSerializer

from .models import *



class SiteBookingView(APIView):
    def get(self, request, park_id, *args, **kwargs):
        bookings = SiteBooking.objects.filter(park_id=park_id)
        serializer = SiteBookingSerializer(bookings, many=True)
        return Response(serializer.data)
    
    def post(self, request, park_id, *args, **kwargs):
        # if json is valid, we check if there is a current booking for the selected site, if we get a model.DoesNotExist we know there is no booking
        # and we save the serialized data
        serializer = SiteBookingSerializer(data=request.data)
        
        if serializer.is_valid(): 
            try:
                current_bookings = SiteBooking.objects.get(park=park_id, site_id=serializer.validated_data['site_id'], start_date=serializer.validated_data['start_date'], end_date=serializer.validated_data['end_date'])
            except SiteBooking.MultipleObjectsReturned:
                return Response({'status':'That site is booked. Please try different dates'}, status=status.HTTP_400_BAD_REQUEST)
            except SiteBooking.DoesNotExist:
                serializer.save()
                return Response(serializer.data)
            
                
            return Response({'status':'That site is booked. Please try different dates'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'status':'Incorrect booking info'}, status=status.HTTP_400_BAD_REQUEST)


class SiteView(APIView):
    def get(self, request, *args, **kwargs):
        sites = Site.objects.all()
        serializer = SiteSerializer(sites, many=True)

        return Response(serializer.data)
    def post(self, request, *args, **kwargs):
        serializer = SiteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'status':'Site input is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, site_id, *args, **kwargs):
        
        obj = Site.objects.get(id=site_id)
        obj.delete()
        return Response({'status':'Site Deleted'})
    
class ParkView(APIView):
    
    def get(self, request, *args, **kwargs):
        parks = Park.objects.all()
        serializer = ParkSerializer(parks, many=True)

        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        
        serializer = ParkSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'status':'Invalid Inputs'}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, park_id, *args, **kwargs):
        serializer = ParkSerializer(data=request.data)

        obj = Park.objects.get(id=park_id)
        obj.delete()
        return Response({'status':'Park Deleted'}, status=status.HTTP_200_OK)






def test(request):
    return render(request, 'index.html')


