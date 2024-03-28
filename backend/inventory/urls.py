from django.urls import path
from . import views

urlpatterns = [
    path('landing-page', views.LandingPageView.as_view(), name="landing-page"),
    path('categories', views.CategoryView.as_view({'get': 'list'}), name='categories'),
    path('categories/<int:pk>', views.CategoryView.as_view({'get': 'retrieve'}), name='category'),
    path('products', views.ProductView.as_view({'get': 'list'}), name="products"),
    path('products/<int:pk>', views.ProductView.as_view({'get': 'retrieve'}), name="product"),
    path('colors', views.ColorView.as_view({'get': 'list'}), name='colors'),
    path('colors/<int:pk>', views.ColorView.as_view({'get': 'retrieve'}), name='color'),
    path('sizes', views.SizeView.as_view({'get': 'list'}), name='sizes'),
    path('sizes/<int:pk>', views.SizeView.as_view({'get' 'retrieve'}), name='size')
]