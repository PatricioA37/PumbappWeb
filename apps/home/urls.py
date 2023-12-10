# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from apps.home import views
from apps.home import  tests

urlpatterns = [

    # The home page
    path('', views.index, name='home'),

    # Ruta para la vista de la tabla
    path('tabla/', views.tabla, name='tabla'),

    # Ruta para la vista de la tabla
    path('notificaciones/', views.notificaciones, name='notificaciones'),

    # Ruta para la vista de la tabla
    path('contadorTotal/', views.contadorTotal, name='contadorTotal'),

    # Ruta para la vista de la tabla
    path('indiceNatalidad/', views.indiceNatalidad, name='indiceNatalidad'),



    # Ruta para la vista de la tabla
    path('indiceNatalidad/', views.indiceNatalidad, name='indiceNatalidad'),









    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),

]
