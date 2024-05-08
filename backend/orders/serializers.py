from .models import Order, OrderItem
from rest_framework import serializers

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
                    'first_name',
                    'last_name',
                    'city',
                    'district',
                    'street_address',
                    'house_number',
                    'phone_number',
                    'payment_method',
                    'order_items',
                  ]
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['stock_id', 'quantity']