from django.shortcuts import render
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import redirect
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.conf import settings
import stripe

from .serializers import ParkSerializer, SiteBookingSerializer, SiteSerializer, CreateSiteBookingSerializer, SiteImageSerializer

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

    def get(self, request, park_id, arrival, departure, *args, **kwargs):
        
        """
        Get a list of available campsites.

        Parameters:
        - park_id (integer): The unique identifier of the park where campsites are located.
        - arrival (string, format: YYYY-MM-DD): The date of arrival for the booking.
        - departure (string, format: YYYY-MM-DD): The date of departure for the booking.

        Returns:
        - 200 OK: List of available campsites with their details.
        - 400 Bad Request: If the date format is invalid.
        """


        available_sites = Site.objects.filter(park_id=park_id).exclude(sitebooking__start_date__lte=arrival, sitebooking__end_date__gte=arrival)\
            .exclude(sitebooking__start_date__lte=departure, sitebooking__end_date__gte=departure)


        serializer = SiteSerializer(available_sites, many=True)
        print(serializer.data)

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
        print(request.data)
        
        if serializer.is_valid():
            print("valid data") 
            try:
                current_bookings = SiteBooking.objects.get(site_id=serializer.validated_data['site_id'], start_date=serializer.validated_data['start_date'], end_date=serializer.validated_data['end_date'])
            except SiteBooking.MultipleObjectsReturned:
                print("Site booking already exists")
                return Response({'status':'That site is booked. Please try different dates'}, status=status.HTTP_400_BAD_REQUEST)
            except SiteBooking.DoesNotExist:
                booking = SiteBooking.objects.create(park_id=park_id, site_id=serializer.validated_data['site_id'], 
                                                     start_date=serializer.validated_data['start_date'], 
                                                     end_date=serializer.validated_data['end_date'], payment_made = serializer.validated_data['payment_made'],
                                                     first_name=serializer.validated_data['first_name'], last_name=serializer.validated_data['last_name'],
                                                      email=serializer.validated_data['email'] )
                
                return Response(SiteBookingSerializer(booking).data)
            
                
            return Response({'status':'That site is booked. Please try different dates'}, status=status.HTTP_400_BAD_REQUEST)
        print("invalid data")
        return Response({'status':'Incorrect booking info'}, status=status.HTTP_400_BAD_REQUEST)

class SiteImageView(APIView):
    def get(self, request, site_id, *args, **kwargs):
        
        images = SiteImage.objects.filter(site=site_id)
        print(site_id)
        serializer = SiteImageSerializer(images, many=True)

        return Response(serializer.data)


class SiteView(APIView):
    def get(self, request, site_id, *args, **kwargs):
        site = Site.objects.get(id=site_id)
        serializer = SiteSerializer(site, many=False)

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
    
    def get(self, request, park_id, *args, **kwargs):
        park = Park.objects.get(id=park_id)
        serializer = ParkSerializer(park, many=False)

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


FRONTEND_CHECKOUT_SUCCESS_URL = settings.CHECKOUT_SUCCESS_URL
FRONTEND_CHECKOUT_FAILED_URL = settings.CHECKOUT_FAILED_URL
stripe.api_key = settings.STRIPE_TEST
class StripeCheckoutSession(APIView):
    def post(self, request, *args, **kwargs):
        data_dict = dict(request.data) #Take Site and booking info and create a sitebooking object
        print(data_dict)
        price = data_dict['price'][0] #Filter through object to send info with pricing etc to stripe
        park_id = int(data_dict["park_id"][0])
        park_obj = Park.objects.get(id=park_id)
        site_id = int(data_dict['site_id'][0])
        site_obj = Site.objects.get(id=site_id)
        start_date = data_dict['start_date'][0] 
        end_date = data_dict['end_date'][0]
        first_name = "John"
        last_name = "Doe"
        email = "johndoe@hotmail.com"
        payment_made = False

        
        booking_obj = SiteBooking.objects.create(park=park_obj, site_id=site_obj, start_date=start_date, end_date=end_date, payment_made=payment_made, first_name=first_name, last_name=last_name, email=email)
        
        
        try:

            checkout_session = stripe.checkout.Session.create(
                
            line_items =[{
                'price_data' :{
                'currency' : 'cad',  
                'product_data': {
                'name': site_id,
                },
                'unit_amount': price
                },
                'quantity' : 1
                }],
                mode= 'payment',
                success_url= FRONTEND_CHECKOUT_SUCCESS_URL,
                cancel_url= FRONTEND_CHECKOUT_FAILED_URL,
                )
            print('session created')
            return HttpResponseRedirect(checkout_session.url)
        except Exception as e:
            print(e)

            return e
    
class WebhookTest(APIView):
    
  def post(self , request):
    event = None
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    webhook_secret = settings.WEBHOOK_SECRET

    try:
      event = stripe.Webhook.construct_event(
        payload ,sig_header , webhook_secret
        )
    except ValueError as err:
        # Invalid payload
        raise err
    except stripe.error.SignatureVerificationError as err:
        # Invalid signature
        raise err

    # Handle the event
    if event.type == 'payment_intent.succeeded':
      payment_intent = event.data.object 
      print("--------payment_intent ---------->" , payment_intent)
    elif event.type == 'payment_method.attached':
      payment_method = event.data.object 
      print("--------payment_method ---------->" , payment_method)
    # ... handle other event types
    else:
      print('Unhandled event type {}'.format(event.type))

    return JsonResponse(success=True, safe=False)

