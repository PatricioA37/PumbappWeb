import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore



import firebase_admin
from django.http import JsonResponse
from firebase_admin import credentials
from firebase_admin import firestore
# CONFIGURACIÓN FIREBASE

cred = credentials.Certificate(r'C:\Users\Patricio Arias\Documents\proyectos programacion\pumbapp\PumbappWeb\core\pumbapp-5cf99-firebase-adminsdk-b345t-f3f2056e6e.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""



# CONFIGURACIÓN FIREBASE
cred = credentials.Certificate(r'C:\Users\Patricio Arias\Documents\proyectos programacion\pumbapp\PumbappWeb\core\pumbapp-5cf99-firebase-adminsdk-b345t-f3f2056e6e.json')
firebase_admin.initialize_app(cred,name='firebase-lectura')

db = firestore.client()


   # # Obtener todos los documentos de la colección 'Productor'
productores = db.collection('Productor').get()
datosParto = []

    # Zona horaria UTC-3 para Santiago, Chile
  #  tz_utc_menos_3 = pytz.timezone('America/Santiago')

    # Iterar sobre los documentos de la colección 'Productor'
for productor in productores:
        # Obtener el ID y display_name del productor
    id_productor = productor.id
    nombre = productor.get('display_name')

   # print(productor.to_dict())

    # Obtener la referencia al documento del productor
    productor_ref = db.collection('Productor').document(id_productor)

    # Realizar una subconsulta para obtener los registros de parto asociados a este productor
    registros_parto_productor = productor_ref.collection('Registro_Parto').get()

    # Lista para almacenar los datos de parto para este productor
    datos_parto_productor = []

    # Iterar sobre los registros de parto y agregar los datos al formato requerido
    for registro_parto_doc in registros_parto_productor:
        data_parto = registro_parto_doc.to_dict()

        # Obtener la fecha original de 'Fecha_Parto'
        fecha_parto_original = data_parto.get('Fecha_Parto')

        # Convertir la fecha a UTC-3
      #  fecha_parto_utc_menos_3 = fecha_parto_original.replace(tzinfo=pytz.utc).astimezone(tz_utc_menos_3)

        # Estructurar los datos de parto según tus necesidades
        datos_parto = {
            "nombreProductor": nombre,
            "Productor": id_productor,
          #  "FechaParto": fecha_parto_utc_menos_3.strftime('%Y-%m-%d %H:%M:%S'),  # Formatear la fecha según tus necesidades
            "Cantidad_hijosMUERTOS": data_parto.get('Cantidad_hijosMUERTOS', ''),
            "Cantidad_hijosTOTAL": data_parto.get('Cantidad_hijosTOTAL', ''),
            "Cantidad_hijosVIVOS": data_parto.get('Cantidad_hijosVIVOS', ''),
            # Agrega más campos según sea necesario
        }

       # print(datos_parto)

        # Agregar los datos de parto a la lista
      #  datos_parto_productor.append(datos_parto)

        # Agregar los datos de parto para este productor a la lista general
       #datosParto.append(datos_parto_productor)

