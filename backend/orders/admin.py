from django.contrib import admin
from .models import Order, OrderItem, DeliveryFee
from inventory.models import Stock

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = [
        'product_name',
        'size_name',
        'color_name',
        'quantity',
    ]
    
    def product_name(self, obj):
        '''Fetch the product name using the stock id'''
        stock = Stock.objects.get(pk=obj.stock_id)
        product = stock.product
        return product
    product_name.short_description = "المنتج"
    
    def size_name(self, obj):
        '''Fetch the size name using the stock id'''
        stock = Stock.objects.get(pk=obj.stock_id)
        size = stock.size
        return size
    size_name.short_description = "المقاس"
    
    def color_name(self, obj):
        '''Fetch the color name using the stock id'''
        stock = Stock.objects.get(pk=obj.stock_id)
        color = stock.color
        return color
    color_name.short_description = "اللون"
    
    
        
class OrderItemTable(admin.TabularInline):
    model = OrderItem
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'first_name',
        'last_name',
        'city',
        'district',
        'street_address',
        'phone_number',
        'payment_method',
    ]
    
    inlines = [OrderItemTable]