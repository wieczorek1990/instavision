import io
import json

from google.cloud import vision
from google.cloud.vision import types
from rest_framework import views
from rest_framework import response
from rest_framework import status

from api import models
from api import forms
from django import http


class ImageUpload(views.APIView):
    @staticmethod
    def grab_faces(image_obj):
        client = vision.ImageAnnotatorClient()
        result = []
        with io.open(image_obj.image.path, 'rb') as image_file:
            content = image_file.read()
            image = types.Image(content=content)
            response = client.face_detection(image=image)
            for face in response.face_annotations:
                vertices = []
                for vertex in face.bounding_poly.vertices:
                    vertices.append({'x': vertex.x, 'y': vertex.y})
                result.append(vertices)
        image_obj.meta = json.dumps(result)
        image_obj.save()

    @classmethod
    def post(cls, request):
        form = forms.ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image = models.Image.objects.create(image=form.cleaned_data['image'])
            cls.grab_faces(image)
            return http.HttpResponse('Upload successful.')
        else:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)