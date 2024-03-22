# Generated by Django 5.0.3 on 2024-03-22 14:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('landing_page', '0011_alter_productsize_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='main_image',
        ),
        migrations.AlterField(
            model_name='image',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='landing_page.product'),
        ),
    ]
