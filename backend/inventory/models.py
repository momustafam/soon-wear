from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError
import os

AVAILABLE_FEATURES = [
    ('top_discounts', 'أقوى التخفيضات'), 
    ('top_selling', 'المنتجات الأكثر مبيعاً'), 
    ('recently_arrived', 'وصل حديثاً'), 
    ('None', 'لا يوجد')
    ]

BANNER_TYPES = [
    ('main_banner_dynamic', 'أعلى الصفحة (متحرك)'), 
    ('main_banner_static', 'أعلى الصفحة (ثابت)'), 
    ('top_selling_banner', 'فوق الأعلى مبيعاً'), 
    ('recently_arrived_banner', 'فوق وصل حديثاً'),
    ('customer_review', 'آراء العملاء')
    ]

class Category(models.Model):
    name = models.CharField(
        max_length=50, 
        unique=True, 
        verbose_name="الاسم"
        )
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "الفئة"
        verbose_name_plural = "الفئات"
        
class Size(models.Model):
    name = models.CharField(
        max_length=50, 
        unique=True, 
        verbose_name="الاسم"
        )

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "المقاس"
        verbose_name_plural = "المقاسات"

class Color(models.Model):
    name = models.CharField(
        max_length=50, 
        unique=True, 
        verbose_name="الاسم"
        )
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'اللون'
        verbose_name_plural = 'الألوان'

class Product(models.Model):
    name = models.CharField(
        max_length=50,
        unique=True,
        verbose_name="الاسم",
        db_index=True
        )
    description = models.CharField(
        max_length=255, 
        blank=True, 
        verbose_name="الوصف"
        )
    feature = models.CharField(
        max_length=20,
        choices=AVAILABLE_FEATURES,
        default='None',
        verbose_name="الميزة",
        db_index=True
        )
    price = models.PositiveIntegerField(
        default=0, 
        verbose_name="السعر"
        )
    reviews_count = models.PositiveBigIntegerField(
        default=0, 
        verbose_name='عدد المراجعات'
        )
    discount = models.PositiveIntegerField(
        default=0, 
        verbose_name="الخصم بالجنية"
        )
    rating = models.DecimalField(
        default=0,
        max_digits=2,
        decimal_places = 1,
        validators=[MaxValueValidator(5), MinValueValidator(0)],
        verbose_name = "تقييم المنتج"
        )
    category = models.ForeignKey(
        Category, 
        on_delete=models.PROTECT, 
        related_name='products', 
        verbose_name="الفئة",
        db_index=True
        )
    
    class Meta:
        verbose_name = "المنتج"
        verbose_name_plural = "المنتجات"
    
    def __str__(self):
        return self.name
    
    def delete(self, *args, **kwargs):
        for img_obj in self.images.all():
            if os.path.exists(img_obj.image.path):
                os.remove(img_obj.image.path)
        super().delete(*args, **kwargs)
    
    def clean(self):
        super().clean()
        if self.discount > self.price:
            raise ValidationError({'discount': 'الخصم لا يمكن أن يكون أكبر من السعر.'})


class Stock(models.Model):
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name="stock", 
        verbose_name="مخزون"
        )
    size = models.OneToOneField(
        Size, 
        on_delete=models.PROTECT, 
        verbose_name="المقاس"
        )
    color = models.OneToOneField(
        Color, 
        on_delete=models.PROTECT, 
        verbose_name='اللون'
        )
    quantity = models.PositiveIntegerField(
        default=0, 
        verbose_name="الكمية"
        )

    class Meta:
        verbose_name = "مخزون"
        verbose_name_plural = "مخزون المنتج"

class ProductImage(models.Model):
    image = models.ImageField(
        upload_to='products/', 
        verbose_name="الصورة"
        )
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name="images", 
        verbose_name="المنتج"
        )
    
    def __str__(self):
        return os.path.basename(self.image.name)

    def delete(self, *args, **kwargs):
        if os.path.exists(self.image.path):
            os.remove(self.image.path)       
        super().delete(*args, **kwargs)
    
    class Meta:
        verbose_name = "صورة المنتج"
        verbose_name_plural = "صور المنتجات"
        
    def save(self, *args, **kwargs):
        try:
            old_image = ProductImage.objects.get(pk=self.pk)
            if self.image != old_image.image:
                if os.path.exists(self.image.path):
                    os.remove(old_image.image.path)
        except:
            pass
        super().save(*args, **kwargs)
        
class Banner(models.Model):
    image = models.ImageField(upload_to='banners/', verbose_name="الصورة")
    url = models.URLField(blank=True, null=True, verbose_name="رابط  يفتح عند الضغط على الصورة")
    location = models.CharField(
        max_length=50,
        verbose_name="موقعها فى الصفحة الرئيسية",
        choices=BANNER_TYPES
        )
    
    class Meta:
        verbose_name = "الرآية"
        verbose_name_plural = "الرآيات"
    
    def __str__(self):
        return os.path.basename(self.image.name)
    
    def delete(self, *args, **kwargs):
        if os.path.exists(self.image.path):
            os.remove(self.image.path)
        super().delete(*args, **kwargs)
        
    def save(self, *args, **kwargs):
        try:
            old_image = Banner.objects.get(pk=self.pk)
            if self.image != old_image.image:
                if os.path.exists(self.image.path):
                    os.remove(old_image.image.path)
        except:
            pass
        super().save(*args, **kwargs)