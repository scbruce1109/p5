"""p5 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from .views import home_page, array_save_view
from p5site.views import SketchListView, SketchDetailSlugView
from django.views import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_page, name='home'),
    path('save', array_save_view, name='save'),
    path('sketches/', SketchListView.as_view(), name='sketches'),
    path('sketches/<slug:slug>/', SketchDetailSlugView.as_view(), name='sketch-detail'),
    # path('files', static.serve, {'document_root': "C:/Users/bruce"}, name='files')
]
