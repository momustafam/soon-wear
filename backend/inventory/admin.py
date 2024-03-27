from django.db import models
from django.contrib import admin
from django.forms import TextInput
from django.core.exceptions import ValidationError
from .models import Size, ProductImage, Banner, Category, Product, Stock, Color
import os

class ProductStockTable(admin.TabularInline):
    model = Stock
    extra = 1

class ProductImageTable(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    actions = ['delete_selected']
    exclude = ('reviews_count', 'rating')
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size': 50})},
    } 
    list_display = (
        'name', 
        'category', 
        'price', 
        'discount', 
        'rating', 
        'reviews_count',
        'available_quantity',
    )
    inlines = [ProductStockTable, ProductImageTable]

    def available_quantity(self, obj):
        '''Calculate the available quantity related to `obj` product.'''
        total_quantity = Stock.objects.filter(product=obj).aggregate(models.Sum('quantity'))['quantity__sum']
        return total_quantity if total_quantity is not None else 0
    available_quantity.short_description = 'الكمية المتاحة'
    
    def delete_selected(self, request, queryset):
        for product in queryset:
            for img_obj in product.images.all():
                if os.path.exists(img_obj.image.path):
                    os.remove(img_obj.image.path)
        deleted = queryset.delete()
        
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name', 
        'number_of_products'
        )
    
    def number_of_products(self, obj):
        '''Calculate the number of products related to the `obj` category.'''
        return obj.products.count()
    number_of_products.short_description = 'عدد المنتجات'
    
@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    actions = ['delete_selected']
    list_display = ['image_name', 'location']
    
    def delete_selected(self, request, queryset):
        for banner in queryset:
            if os.path.exists(banner.image.path):
                os.remove(banner.image.path)
        deleted = queryset.delete()
        
    def image_name(self, obj):
        return str(obj)
    image_name.short_description = 'الصورة'