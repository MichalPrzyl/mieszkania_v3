from rest_framework import serializers

# models
from mieszkania.models import Apartment

class ApartmentSerializer(serializers.ModelSerializer):
    last_saved_price = serializers.SerializerMethodField()
    
    def get_last_saved_price(self, obj):
        return obj.last_saved_price.price if obj.last_saved_price else 0

    class Meta:
        model = Apartment
        fields = ["id", "name", "url", "last_saved_price", 'page_title']