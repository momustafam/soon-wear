from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from .models import Product, Category, Banner
from .serializers import ProductSerializer, CategorySerializer, BannerSerializer
from collections import defaultdict

class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    ordering_fields = ['price', 'discount', 'rating']
    
    def get_queryset(self):
        # Get the queryset before filtering
        queryset = super().get_queryset()

        # Get the query paramaters
        feature = self.request.query_params.get('feature')
        category_id = self.request.query_params.get('category')
        size_id = self.request.query_params.get('size')
        color_id = self.request.query_params.get('size')
        
        # Filter queryset by given paramters
        if feature is not None:
            queryset = queryset.filter(feature=feature)
        if category_id is not None:
            queryset = queryset.filter(category=category_id)
        if size_id is not None:
            queryset = queryset.filter(stocks__size__id=size_id)
        if color_id is not None:
            queryset = queryset.filter(stocks__color__id=color_id)

        return self.queryset

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Extract query parameters from request
        feature = self.request.query_params.get('feature', None)
        category_id = self.request.query_params.get('category', None)
        size = self.request.query_params.get('size', None)
        color = self.request.query_params.get('color', None)
        
        if feature is not None:
            queryset = queryset.filter(feature=feature)
        if category_id is not None:
            queryset = queryset.filter(category__id=category_id)
        if size is not None:
            queryset = queryset.filter(stocks__size__name=size)
        if color is not None:
            queryset = queryset.filter(stocks__color__name=color)    
        return queryset

class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    ordering_fields = ['name']
    search_fields = ['name']
    pagination_class = None


class LandingPageView(APIView):
    def get(self, request):
        '''Response with needed data to render soon wear home page
        
            Return:
                - The last 3 products from `top selling`, `top discounts`,
                  and `recently arrived` products.
                - All Banners
        '''
        features = ['top_discounts', 'top_selling', 'recently_arrived']
        banners_locations = [
            'main_banner_dynamic', 
            'main_banner_static', 
            'top_selling_banner',
            'recently_arrived_banner',
            'customer_review']
        data = {}
        data['banners'] = {}
                
        # Group banners data by location
        for location in banners_locations:
            data['banners'][location] = BannerSerializer(Banner.objects.filter(location=location), many=True).data
            
        for feature in features:
            data[feature] = ProductSerializer(Product.objects.filter(feature=feature)[:4], many=True).data

        return Response(data, status.HTTP_200_OK)