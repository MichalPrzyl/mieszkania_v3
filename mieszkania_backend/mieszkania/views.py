from rest_framework import mixins, generics
from rest_framework.response import Response

# external
import requests
import re

# models
from mieszkania.models import Apartment, Price

# serializers
from mieszkania.serializers import ApartmentSerializer

class ApartmentGenerciAPI(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer

    def get(self, request, pk=None):
        return self.list(request)

    def post(self, request):
        return self.create(request)
    
    def delete(self, request, pk=None):
        return self.destroy(request, pk)
    

class GetPricesGenericAPI(generics.GenericAPIView):
    def get(self, request, pk):
        apartment = Apartment.objects.get(id=pk)
        url = apartment.url
        actual_price = self.get_price_from_url(url)
        if actual_price:
            actual_price = actual_price.replace(" ", "")[:-2]
            try:
                actual_price = float(actual_price)
                Price.objects.create(apartment_id=pk, price=actual_price)
            except:
                return Response("Nie mogę pobrać ceny. Skontaktuj się z administratorem, MP")
        page_title = self.get_title_from_url(url)
        apartment.page_title = page_title
        apartment.save()
        return Response("succes")

    @staticmethod
    def get_price_from_url(url):
        if 'http' not in url:
            url = 'http://' + url
        # REGEXES AND MAGIC STUFF GOES HERE
        try:
            response = requests.get(url)
        except:
            return None
        pattern = r"\d{1,3} \d{1,3} (\d{1,3} )?zł"
        x = re.search(pattern, response.text)
        if not x:
            return None
        return x.group()
    
    @staticmethod
    def get_title_from_url(url):
        if 'http' not in url:
            url = 'http://' + url
        # REGEXES AND MAGIC STUFF GOES HERE
        try:
            response = requests.get(url)
        except:
            return None
        pattern = "<title>(.*?)</title>"

        x = re.search(pattern, response.text)
        if not x:
            return None
        else:
            return x.group()[7:-24]
