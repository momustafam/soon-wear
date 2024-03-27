from rest_framework import serializers
from collections import defaultdict
from .models import Product, ProductImage, Stock, Category, Banner

class ProductImageSerializer(serializers.ModelSerializer):
    path = serializers.CharField(max_length=100, source='image')
    color = serializers.CharField(max_length=50, source='color.name')
    class Meta:
        model = ProductImage
        fields = ['path', 'color']
    
        
class StockSerializer(serializers.ModelSerializer):
    size_name = serializers.CharField(source="size.name")
    color_name = serializers.CharField(source="color.name")

    class Meta:
        model = Stock
        fields = ['id', 'size_name', 'color_name', 'quantity']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ['image', 'url']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True)
    stocks = StockSerializer(many=True)
    
    class Meta:
        model = Product
        fields = [
            'id',
            'name', 
            'description', 
            'feature', 
            'price',
            'discount',
            'rating',
            'reviews_count',
            'category',
            'stocks',
            'images',
            ]
        
    def to_representation(self, instance):
        # Get the original representation from the parent class
        representation = super().to_representation(instance)
        
        # Group images by color
        unique_images = defaultdict(list)
        for image in representation['images']:
            unique_images[image['color']].append(image['path'])

        # Replace the original images with the unique ones
        representation['images'] = unique_images
        
        return representation