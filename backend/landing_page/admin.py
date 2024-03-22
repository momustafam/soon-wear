from django.db import models
from django.contrib import admin
from django.forms import TextInput
from landing_page.models import Size, Image, Banner, Category, Product, ProductSize

class ProductSizeTable(admin.TabularInline):
    model = Product.sizes.through
    extra = 1

class ProductImageTable(admin.TabularInline):
    model = Image
    list_display = ['image', 'delete_image']
    extra = 1

    def delete_image(self, obj):
        obj.delete()

class ProductAdmin(admin.ModelAdmin):
    exclude = ('reviews_count', 'rating')
    inlines = [ProductSizeTable, ProductImageTable]
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

    def available_quantity(self, obj):
        '''Calculate the available quantity related to `obj` product.'''
        total_quantity = ProductSize.objects.filter(product=obj).aggregate(models.Sum('quantity'))['quantity__sum']
        return total_quantity if total_quantity is not None else 0
    
    available_quantity.short_description = 'available quantity'
    
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name', 
        'number_of_products'
        )
    
    def number_of_products(self, obj):
        '''Calculate the number of products related to the `obj` category.'''
        nproducts = Category.objects.filter(pk=obj.pk).aggregate(models.Count('products'))['products__count']
        return nproducts if nproducts is not None else 0
    number_of_products.short_description = 'number of products'

admin.site.register(Size)
admin.site.register(Image)
admin.site.register(Banner)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)