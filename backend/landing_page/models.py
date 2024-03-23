from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import os

available_features = [
    ('top_discounts', 'top discounts'), 
    ('top_selling', 'top selling'), 
    ('recently_arrived', 'recently arrived'), 
    ('None', 'None')
    ]

class Size(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
    
class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name
    
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=255, null=True)
    feature = models.CharField(
        max_length=20,
        choices=available_features,
        default='None'
    )
    price = models.PositiveIntegerField()
    reviews_count = models.PositiveBigIntegerField(default=0, verbose_name='number of reviews')
    discount = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(
        default=0,
        max_digits=2,
        decimal_places = 1,
        validators=[MaxValueValidator(5), MinValueValidator(1)]
    )
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='products')
    sizes = models.ManyToManyField(Size, through="ProductSize")
    
    def __str__(self):
        return self.name
    
    def delete(self, *args, **kwargs):
        '''
        Delete the product images from the file storage system
        before delete the `Product` object from the database.
        '''
        for img_obj in self.images.all():
            os.remove(img_obj.image.path)
        super().delete(*args, **kwargs)

class ProductSize(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    Size = models.ForeignKey(Size, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=0)

class Image(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='products/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    
    def __str__(self):
        return str(self.image).split('/')[1]

    def delete(self, *args, **kwargs):
        '''
        Delete the image from the file storage system
        before delete the `Image` object record from the database.
        '''
        os.remove(self.image.path)        
        super().delete(*args, **kwargs)
        
    def save(self, *args, **kwargs):
        '''
        Delete any updated image from the file storage before removing its
        object from the database (when the user update an image for a product).
        '''
        try:
            old_image = Image.objects.get(pk=self.pk)
            if self.image != old_image.image:
                os.remove(old_image.image.path)
        except:
            pass
        super().save(*args, **kwargs)
        
class Banner(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='banners/')
    url = models.URLField(blank=True, null=True)

    def __str__(self):
        return str(self.image).split('/')[1]
    
    def delete(self, *args, **kwargs):
        '''
        Delete the image from the file storage system
        before delete the `Banner` object from the database.
        '''
        os.remove(self.image.path)
        super().delete(*args, **kwargs)
        
    def save(self, *args, **kwargs):
        '''
        Delete any updated image from the file storage before removing its
        object from the database (when the user update an image for a banner).
        '''
        try:
            old_image = Banner.objects.get(pk=self.pk)
            if self.image != old_image.image:
                os.remove(old_image.image.path)
        except:
            pass
        super().save(*args, **kwargs)