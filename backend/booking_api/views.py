from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

from .serializers import ParkSerializer, SiteBookingSerializer, SiteSerializer, CreateSiteBookingSerializer

from .models import *



class SiteBookingView(APIView):
    """
    API endpoint for booking and retrieving campsite reservations.

    GET /bookings/<int:park_id>/
    - Returns a list of all bookings for the given park_id.

    POST /bookings/<int:park_id>/
    - Allows users to create a new campsite booking for the specified park_id.
    - The request should include a JSON payload with the following fields:
        - site_id: The unique identifier of the campsite to book.
        - start_date: The start date of the booking (format: YYYY-MM-DD).
        - end_date: The end date of the booking (format: YYYY-MM-DD).
    - The API will check if the specified campsite is available for the given date range.
    - If the campsite is available, it will create the booking and return the serialized booking data.
    - If the campsite is already booked for any overlapping dates, it will return an error message.
    """

    def get(self, request, park_id, *args, **kwargs):
        """
        GET request handler to retrieve all bookings for a specific park.

        Parameters:
        - park_id (int): The unique identifier of the park for which bookings are requested.

        Returns:
        - Response: A JSON response containing a list of serialized booking data for the specified park_id.
        """
        bookings = SiteBooking.objects.filter(park_id=park_id)
        
        serializer = SiteBookingSerializer(bookings, many=True)
        
        
        list_of_dicts = []
        '''
        for data_dict in serializer.data: #Appends only id, start and end date to list for response
            obj_key = data_dict['id']
            start_date_value = data_dict["start_date"]
            end_date_value = data_dict['end_date']
            dict = {'id': obj_key, 'start_date': start_date_value, 
                'end_date': end_date_value}
            list_of_dicts.append(dict)
            print(start_date_value)

        return Response(list_of_dicts)
        '''
        return Response(serializer.data)
    

    def post(self, request, park_id, *args, **kwargs):
        """
        POST request handler to create a new campsite booking for a specific park.

        Parameters:
        - park_id (int): The unique identifier of the park for which the booking is being created.
        - request (Request): The HTTP request object containing the JSON payload with booking information.

        Returns:
        - Response: A JSON response containing either the serialized booking data if successful, or an error message if the campsite is already booked for the given date range.
        """
        serializer = CreateSiteBookingSerializer(data=request.data)
        
        if serializer.is_valid(): 
            try:
                current_bookings = SiteBooking.objects.get(site_id=serializer.validated_data['site_id'], start_date=serializer.validated_data['start_date'], end_date=serializer.validated_data['end_date'])
            except SiteBooking.MultipleObjectsReturned:
                return Response({'status':'That site is booked. Please try different dates'}, status=status.HTTP_400_BAD_REQUEST)
            except SiteBooking.DoesNotExist:
                booking = SiteBooking.objects.create(park_id=park_id, site_id=serializer.validated_data['site_id'], 
                                                     start_date=serializer.validated_data['start_date'], 
                                                     end_date=serializer.validated_data['end_date'], payment_made = serializer.validated_data['payment_made'])
                
                return Response(SiteBookingSerializer(booking).data)
            
                
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


