from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer, OrderItemSerializer
from .models import OrderItem, Order

class OrdersView(APIView):
    def get(self, request):
        orders = Order.objects.all()
        orders_serializer = OrderSerializer(orders, many=True)
        return Response(orders_serializer.data, status=status.HTTP_201_CREATED)
    
    
    def post(self, request):
        order_serializer = OrderSerializer(data=request.data.get("order"))
        order_item_serializer = OrderItemSerializer(data=request.data.get("orderItems"), many=True)
        if order_serializer.is_valid() and order_item_serializer.is_valid():
            order = order_serializer.save()
            order_items_data = order_item_serializer.validated_data
            for item_data in order_items_data:
                OrderItem.objects.create(order_id=order, **item_data)
            return Response({'order': order_serializer.data, 'orderItems': order_item_serializer.validated_data}, status=status.HTTP_201_CREATED)

        # If either serializer is not valid, return errors
        return Response({
            'error': {
                'order_errors': order_serializer.errors if not order_serializer.is_valid() else None,
                'order_item_errors': order_item_serializer.errors if not order_item_serializer.is_valid() else None
            }
        }, status=status.HTTP_400_BAD_REQUEST)