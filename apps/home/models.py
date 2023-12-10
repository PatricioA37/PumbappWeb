# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models
from django.contrib.auth.models import User
import firebase_admin
from django.http import JsonResponse
from firebase_admin import credentials
from firebase_admin import firestore

# CONFIGURACIÓN FIREBASE
cred = credentials.Certificate(r'C:\Users\patri\OneDrive\Escritorio\sistema web django Pumbapp\django-dashboard-kit\core\pumbapp-5cf99-firebase-adminsdk-b345t-f3f2056e6e.json')
firebase_admin.initialize_app(cred,name='firebase-lectura')

db = firestore.client()

# Obtener todos los documentos de la colección 'Productor'
productores = db.collection('Productor').get()

datosParto = []

# Iterar sobre los documentos de la colección 'Productor'
for productor in productores:
    # Obtener el ID del productor
    id_productor = productor.id

    # Obtener la referencia al documento del productor
    productor_ref = db.collection('Productor').document(id_productor)

    # Realizar una subconsulta para obtener los registros de parto asociados a este productor
    registros_parto_productor = productor_ref.collection('Registro_Parto').get()

    # Lista para almacenar los datos de parto para este productor
    datos_parto_productor = []

    # Iterar sobre los registros de parto y agregar los datos al formato requerido
    for registro_parto_doc in registros_parto_productor:
        data_parto = registro_parto_doc.to_dict()

        # Estructurar los datos de parto según tus necesidades
        datos_parto = {
            "Productor": id_productor,
            "FechaParto": data_parto.get('Fecha_Parto'),  # Puedes ajustar el timestamp según tus necesidades
            "Cantidad_hijosMUERTOS": data_parto.get('Cantidad_hijosMUERTOS', ''),
            "Cantidad_hijosTOTAL": data_parto.get('Cantidad_hijosTOTAL', ''),
            "Cantidad_hijosVIVOS": data_parto.get('Cantidad_hijosVIVOS', ''),
            # Agrega más campos según sea necesario
        }

        print(datos_parto)


        # Agregar los datos de parto a la lista
        datos_parto_productor.append(datos_parto)



    # Agregar los datos de parto para este productor a la lista general
    datosParto.append(datos_parto_productor)

