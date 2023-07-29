
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm

from .models import *

# Register your models here.
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm

    model = User

    list_display = ('email','first_name', 'last_name')
    list_filter = ('email','first_name', 'last_name')

    fieldsets = (
        (None, {'fields': ('email', 'password', 'first_name', 'last_name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active',
        'is_superuser', 'groups', 'user_permissions')}),
        ('Dates', {'fields': ('last_login', 'date_joined')}))


    add_fieldsets = (
        (None, {
            'classes':('wide'),
            'fields':('first_name','last_name', 'email', 'password1', 'password2', 'program', 'is_staff', 'is_active',)}
        ),
    )
    
    search_fields = ('email','first_name', 'last_name')
    ordering = ('email', 'first_name', 'last_name')

@admin.register(SiteBooking)
class SiteBookingAdmin(admin.ModelAdmin):
    list_display = ("park", "site_id", "start_date", "end_date", "total_cost")

    

admin.site.register(Site)
admin.site.register(Park)

