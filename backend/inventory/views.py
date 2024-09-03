from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from .models import Product, Category, Banner, Color, Size
from .serializers import ProductSerializer, CategorySerializer, BannerSerializer, SizeSerializer, ColorSerializer


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    ordering_fields = ['price', 'discount', 'rating']
    search_fields = ['name']

    def get_queryset(self):
        queryset = super().get_queryset()

        # Extract query parameters from request
        features = self.request.query_params.get('feature')
        categories = self.request.query_params.get('category')
        sizes = self.request.query_params.get('size')
        colors = self.request.query_params.get('color')

        if features:
            filtered_features = features.split(',')
            queryset = queryset.filter(feature__in=filtered_features)
        if categories:
            filtered_categories = categories.split(',')
            queryset = queryset.filter(category__name__in=filtered_categories)
        if sizes:
            filtered_sizes = sizes.split(',')
            queryset = queryset.filter(stocks__size__name__in=filtered_sizes)
        if colors:
            filtered_colors = colors.split(',')
            queryset = queryset.filter(stocks__color__name__in=filtered_colors)

        return queryset.distinct()


class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    ordering_fields = ['name']
    search_fields = ['name']
    pagination_class = None


class ColorView(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    ordering_fields = ['name']
    search_fields = ['name']
    pagination_class = None


class SizeView(viewsets.ModelViewSet):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer
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
            data['banners'][location] = BannerSerializer(
                Banner.objects.filter(location=location), many=True).data

        for feature in features:
            data[feature] = ProductSerializer(
                Product.objects.filter(feature=feature)[:4], many=True).data

        return Response(data, status.HTTP_200_OK)
