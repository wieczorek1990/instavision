from rest_framework import views
from rest_framework import response
from rest_framework import status

from api import models
from api import forms
from django import http


class ImageUpload(views.APIView):
    @staticmethod
    def post(request):
        form = forms.ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image = models.Image.objects.create(image=form.cleaned_data['image'])
            return http.HttpResponse('Upload successful.')
        else:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)