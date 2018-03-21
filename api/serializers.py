import json
from rest_framework import serializers

from api import models


class ImageSerializer(serializers.ModelSerializer):
    meta = serializers.SerializerMethodField()

    def get_meta(self, obj):
        return json.loads(obj.meta)

    class Meta:
        model = models.Image
        fields = ('id', 'image', 'meta')
