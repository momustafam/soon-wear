from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from .models import Product, Category, Banner
from .serializers import ProductSerializer, CategorySerializer, BannerSerializer

class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    ordering_fields = ['price', 'discount', 'rating']
    search_fields = ['name']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Extract query parameters from request
        feature = self.request.query_params.get('feature', None)
        category_id = self.request.query_params.get('category', None)
        size_id = self.request.query_params.get('size', None)
        color_id = self.request.query_params.get('color', None)
        
        if feature is not None:
            queryset = queryset.filter(feature=feature)
        if category_id is not None:
            queryset = queryset.filter(category__id=category_id)
        if size_id is not None:
            queryset = queryset.filter(quantities__size__id=size_id)
        if color_id is not None:
            queryset = queryset.filter(quantities__color__id=color_id)    
        return queryset

class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    ordering_fields = ['name']
    search_fields = ['name']

class LandingPageView(APIView):
    def get(self, request):
        '''Response with needed data to render soon wear home page
        
            Return:
                - The last 3 products from `top selling`, `top discounts`,
                  and `recently arrived` products.
                - All Banners
        '''
        features = ['top_discounts', 'top_selling', 'recently_arrived']
        data = {}
        data['banners'] = BannerSerializer(Banner.objects.all(), many=True).data
        for feature in features:
            data[feature] = ProductSerializer(Product.objects.filter(feature=feature)[:4], many=True).data

        return Response(data, status.HTTP_200_OK)