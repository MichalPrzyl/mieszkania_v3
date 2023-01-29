from django.db import models

class Apartment(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    page_title = models.CharField(max_length=255, blank=True, null=True)

    @property
    def last_saved_price(self):
        return self.prices.order_by('-timestamp').first()




class Price(models.Model):
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE, related_name="prices")
    price = models.DecimalField(decimal_places=2, max_digits=12)
    timestamp = models.DateTimeField(auto_now=True)
    
