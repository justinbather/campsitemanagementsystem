from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django_resized import ResizedImageField


from .managers import CustomUserManager
from .validators import image_validator, logo_validator

# Create your models here.


class User(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    first_name = models.CharField(max_length=30, unique=False)
    last_name = models.CharField(max_length=30, unique=False)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    

class Park(models.Model):
    name = models.CharField(unique=True, max_length=40)
    address = models.CharField(max_length=50)
    city = models.CharField(max_length=30)
    province = models.CharField(max_length=30)
    postal_code = models.CharField(max_length=6)
    latitude = models.DecimalField(max_digits=30, decimal_places=13)
    longitude = models.DecimalField(max_digits=30, decimal_places=13)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    logo = models.ImageField(upload_to="./assets/park/logo", validators=[logo_validator])
    description = models.TextField(default="No description available")

    def __str__(self):
        return self.name
    

class Amenities(models.Model):
    name = models.CharField(max_length=15)
    icon = models.ImageField(upload_to="./assets/amenities")
    description = models.TextField(default="No description available")

    def __str__(self):
        return self.name

class Site(models.Model):
    PULL_THROUGH = "Pull Through"
    BACK_IN = "Back In"

    SITE_TYPES = [
        (PULL_THROUGH, _("Pull Through")),
        (BACK_IN, _("Back In")),
    ]


    name = models.CharField(max_length=10)
    park_id = models.ForeignKey(Park, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    site_type = models.CharField(choices=SITE_TYPES, max_length=30)
    amenities = models.ManyToManyField(Amenities, related_name="Site")
    thumbnail = models.ImageField(upload_to="./assets/thumbnails", validators=[image_validator])



    def __str__(self):
        return self.name

class SiteBooking(models.Model):
    park = models.ForeignKey(Park, on_delete=models.CASCADE)
    site_id = models.ForeignKey(Site, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    payment_made = models.BooleanField()
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email = models.CharField(max_length=60)
    
    
    def total_cost(self):
        return (self.site_id.price * (self.end_date - self.start_date).days)
    
   



    def __str__(self):
        return self.site_id.name



class SiteImage(models.Model):
    site = models.ForeignKey(Site, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to="./assets/site-images", validators=[image_validator])
    description = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.description