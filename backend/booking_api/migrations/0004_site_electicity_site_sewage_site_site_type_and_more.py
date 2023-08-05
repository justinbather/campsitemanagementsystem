# Generated by Django 4.2.3 on 2023-08-05 02:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking_api', '0003_rename_site_sitebooking_site_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='site',
            name='electicity',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='site',
            name='sewage',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='site',
            name='site_type',
            field=models.CharField(choices=[('Pull Through', 'Pull Through'), ('Back In', 'Back In')], default='Pull Through', max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='site',
            name='water',
            field=models.BooleanField(default=False),
        ),
    ]