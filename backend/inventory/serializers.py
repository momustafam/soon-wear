from rest_framework import serializers
from .models import Product, ProductImage, Stock, Category, Banner

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['image']
    
    def to_representation(self, instance):
        image = super().to_representation(instance)
        return image.get("image")
        
class ProductSizeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="size.name")
    
    class Meta:
        model = Stock
        fields = ['id', 'size', 'color', 'quantity']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ['image', 'url', 'location']

class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    sizes = ProductSizeSerializer(many=True, source="productsize_set")
    
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
            'stock',
            'images'
            ]