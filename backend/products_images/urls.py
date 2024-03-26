from django.urls import path
from . import views

urlpatterns = [
    path('landing-page', views.LandingPageView.as_view()),
    path('products', views.ProductListView.as_view()),
    path('products/<int:pk>', views.SingleProductView.as_view()),
]