# InstaVision

## About

InstaVision detects faces using Google Vision API.

Look for yellow rectangles, yay!

## Technical

This application was built with localhost usage in mind,
meaning that links in the HTML files point to localhost,
SQLite is used.

Google application credentials are needed during image
upload, please provide them under project root
 `/instavision.json`.

Backend port is 8000. Frontend port is 80.

```bash
# backend
pip3 install -r requirements.txt &&\
 python manage.py migrate &&\
 python manage.py runserver 8000
# frontend
cd dist/ && sudo python3 -m http.server 80
# open http://localhost
```
