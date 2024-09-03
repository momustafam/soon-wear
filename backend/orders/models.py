from django.db import models
from inventory.models import Stock

cities = [
    ("القاهرة", "القاهرة"),
    ("الإسكندرية", "الإسكندرية"),
    ("الجيزة", "الجيزة"),
    ("الشرقية", "الشرقية"),
    ("الدقهلية", "الدقهلية"),
    ("القليوبية", "القليوبية"),
    ("كفر الشيخ", "كفر الشيخ"),
    ("الغربية", "الغربية"),
    ("المنوفية", "المنوفية"),
    ("دمياط", "دمياط"),
    ("البحيرة", "البحيرة"),
    ("الفيوم", "الفيوم"),
    ("المنيا", "المنيا"),
    ("أسيوط", "أسيوط"),
    ("سوهاج", "سوهاج"),
    ("قنا", "قنا"),
    ("أسوان", "أسوان"),
    ("الأقصر", "الأقصر"),
    ("البحر الأحمر", "البحر الأحمر"),
    ("مطروح", "مطروح"),
    ("الوادي الجديد", "الوادي الجديد"),
    ("شمال سيناء", "شمال سيناء"),
    ("جنوب سيناء", "جنوب سيناء"),
]

payment_methods = [
    ('PayPal', 'PayPal'),
    ('Credit Card', 'Credit Card'),
    ('Cash On Delivery', 'Cash On Delivery'),
]


class DeliveryFee(models.Model):
    class Meta:
        verbose_name = "مصروف الشحن لمحافظة"
        verbose_name_plural = "مصاريف الشحن للمحافظات"

    city = models.CharField(max_length=50, choices=cities, verbose_name="المحافطة")
    fee = models.PositiveIntegerField(verbose_name="تكلفة الشحن")


class Order(models.Model):
    class Meta:
        verbose_name = "طلب"
        verbose_name_plural = "الطلبات"

    first_name = models.CharField(max_length=50, verbose_name="الاسم الأول")
    last_name = models.CharField(max_length=50, verbose_name="الاسم الأخير")
    city = models.CharField(max_length=50, choices=cities, verbose_name='المحافظة')
    district = models.CharField(max_length=50, verbose_name="المنطقة")
    street_address = models.CharField(max_length=150, verbose_name="عنوان الشارع")
    house_number = models.CharField(max_length=50, null=True, verbose_name="رقم البيت")
    phone_number = models.CharField(max_length=20, verbose_name="رقم الهاتف")
    payment_method = models.CharField(max_length=20, choices=payment_methods, verbose_name="طريقة الدفع")
    
    def __str__(self):
        return self.city + " " + self.district + " " + self.street_address

class OrderItem(models.Model):
    class Meta:
        verbose_name = "منتج"
        verbose_name_plural = "تفاصيل الطلب"

    stock_id = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField(verbose_name="الكمية المطلوبة")
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items")