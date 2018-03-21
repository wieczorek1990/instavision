import io
import os

from google.cloud import vision
from google.cloud.vision import types

client = vision.ImageAnnotatorClient()
file_name = os.path.join(os.path.dirname(__file__), 'people.jpg')

result = []

with io.open(file_name, 'rb') as image_file:
    content = image_file.read()
    image = types.Image(content=content)
    response = client.face_detection(image=image)
    for face in response.face_annotations:
        vertices = []
        for vertex in face.bounding_poly.vertices:
            vertices.append({'x': vertex.x, 'y': vertex.y})
        result.append(vertices)
