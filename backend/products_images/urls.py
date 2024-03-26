from django.urls import path
from . import views

urlpatterns = [
    path('landing-page', views.LandingPageView.as_view(), name="landing-page"),
    path('products', views.ProductView.as_view({'get': 'list'}), name="products"),
    path('products/<int:pk>', views.ProductView.as_view({'get': 'retrieve'}), name="product"),
]