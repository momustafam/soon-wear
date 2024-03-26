from django.db import models
from django.contrib import admin
from django.forms import TextInput
from products_images.models import Size, Image, Banner, Category, Product, ProductSize
import os

class ProductSizeTable(admin.TabularInline):
    model = Product.sizes.through
    extra = 1

class ProductImageTable(admin.TabularInline):
    model = Image
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
    inlines = [ProductSizeTable, ProductImageTable]

    def available_quantity(self, obj):
        '''Calculate the available quantity related to `obj` product.'''
        total_quantity = ProductSize.objects.filter(product=obj).aggregate(models.Sum('quantity'))['quantity__sum']
        return total_quantity if total_quantity is not None else 0
    available_quantity.short_description = 'الكمية المتاحة'
    
    def delete_selected(self, request, queryset):
        print(queryset)
        for product in queryset:
            print("here")
            for img_obj in product.images.all():
                print(img_obj)
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

    def delete_selected(self, request, queryset):
        for banner in queryset:
            if os.path.exists(banner.image.path):
                os.remove(banner.image.path)
        deleted = queryset.delete()

admin.site.register(Size)
admin.site.register(Image)