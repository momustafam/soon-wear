from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from .models import Product, Category, Banner
from .serializers import ProductSerializer, CategorySerializer, BannerSerializer

class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    ordering_fields = ['price', 'discount', 'rating']
    search_fields = ['feature', 'category__id']    

class LandingPageView(APIView):
    def get(self, request):
        '''Response with needed data to render soon wear home page
        
            Return:
                - The last 3 products from `top selling`, `top discounts`,
                  and `recently arrived` products.
                - All categories
                - All Banners
        '''
        features = ['top_discounts', 'top_selling', 'recently_arrived']
        data = {}
        data['categories'] = CategorySerializer(Category.objects.all(), many=True).data
        data['banners'] = BannerSerializer(Banner.objects.all(), many=True).data
        for feature in features:
            data[feature] = ProductSerializer(Product.objects.filter(feature=feature)[:4], many=True).data

        return Response(data, status.HTTP_200_OK)