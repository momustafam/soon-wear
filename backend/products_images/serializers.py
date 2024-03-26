from rest_framework import serializers
from products_images.models import Product, Image, ProductSize, Category, Banner

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image']
    
    def to_representation(self, instance):
        image = super().to_representation(instance)
        return image.get("image")
        
class ProductSizeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="size.name")
    
    class Meta:
        model = ProductSize
        fields = ['id', 'name', 'quantity']

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
            'sizes',
            'images'
            ]
