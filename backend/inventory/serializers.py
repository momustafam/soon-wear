from rest_framework import serializers
from collections import defaultdict
from .models import Product, ProductImage, Stock, Category, Banner, Size, Color
import os

class ProductImageSerializer(serializers.ModelSerializer):
    path = serializers.CharField(max_length=100, source='image')
    color = serializers.CharField(max_length=50, source='color.name')
    class Meta:
        model = ProductImage
        fields = ['path', 'color']
    
class StockSerializer(serializers.ModelSerializer):
    stock_id = serializers.IntegerField(source='id')
    color_name = serializers.CharField(source="color.name")
    size = serializers.CharField(source="size.name")

    class Meta:
        model = Stock
        fields = ['stock_id', 'size', 'color_name', 'quantity']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ['image', 'url']

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['id', 'name']
        
class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'name']

class ProductSerializer(serializers.ModelSerializer):
    main_img = serializers.CharField(max_length=100, source='main_image')
    category_id = serializers.IntegerField(source='category.id')
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
            'main_img',
            'category_id',
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

        unique_sizes = defaultdict(list)
        for stock in representation['stocks']:
            size = stock['size']
            del stock['size']
            unique_sizes[size].append(stock)

        # Replace the original images with the unique ones
        representation['images'] = unique_images
        representation['stocks'] = unique_sizes
        return representation