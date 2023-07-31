from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _



from .managers import CustomUserManager

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
    address = models.CharField(unique=True, max_length=50)
    postal_code = models.CharField(max_length=6)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
class Site(models.Model):
    name = models.CharField(max_length=10)
    park_id = models.ForeignKey(Park, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name

class SiteBooking(models.Model):
    park = models.ForeignKey(Park, on_delete=models.CASCADE)
    site_id = models.ForeignKey(Site, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    payment_made = models.BooleanField()
    
    def total_cost(self):
        return (self.site_id.price * (self.end_date - self.start_date).days)


    def __str__(self):
        return self.site_id.name
