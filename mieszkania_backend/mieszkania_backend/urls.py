from django.contrib import admin
from django.urls import path
from mieszkania.views import ApartmentGenerciAPI, GetPricesGenericAPI


urlpatterns = [
    path('admin/', admin.site.urls),
    path('apartments', ApartmentGenerciAPI.as_view()),
    path('apartments/<int:pk>', ApartmentGenerciAPI.as_view()),
    path('apartments/get-price-from-external/<int:pk>', GetPricesGenericAPI.as_view()),
    
]
