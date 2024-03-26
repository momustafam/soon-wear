from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status
from .models import Product, Category, Banner
from .serializers import ProductSerializer, CategorySerializer, BannerSerializer

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        category = self.request.query_params.get('category')
        feature = self.request.query_params.get('feature')
        if category:
            queryset = Product.objects.filter(category=category)
        elif feature:
            print(feature)
            queryset = Product.objects.filter(feature=feature)
        else:
            return []
        return queryset
            
class SingleProductView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

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
            data[feature] = ProductSerializer(Product.objects.filter(feature=feature)[:3], many=True).data

        return Response(data, status.HTTP_200_OK)