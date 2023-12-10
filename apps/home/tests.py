#from django import template
#from django.http import HttpResponse, HttpResponseRedirect
#from django.template import loader
#from django.urls import reverse
#from django.http import JsonResponse
#from django.views.decorators.http import require_GET
#from django.contrib.auth.decorators import login_required
#import firebase_admin
#from firebase_admin import credentials
#from firebase_admin import firestore

## CONFIGURACIÓN FIREBASE
#cred = credentials.Certificate(r'C:\Users\patri\OneDrive\Escritorio\sistema web django Pumbapp\django-dashboard-kit\core\pumbapp-5cf99-firebase-adminsdk-b345t-f3f2056e6e.json')
#firebase_admin.initialize_app(cred,name='Json')
#db = firestore.client()


#def prueba(request):
#    # Consulta para obtener todos los documentos de la colección 'Productor'
#    productores_query = db.collection('Productor').get()

#    # Contador para la cantidad total de productores
#    cantidad_total_productores = 0

#    # Iterar sobre los documentos de la colección 'Productor'
#    for productor in productores_query:
#        cantidad_total_productores += 1

#    # Consulta para obtener todos los documentos de la colección 'Registro_Animal'
#    animales_query = db.collection('Registro_Animal').get()

#    # Contador para la cantidad total de animales
#    cantidad_total_animales = 0

#    # Iterar sobre los documentos de la colección 'Registro_Animal'
#    for animal in animales_query:
#        cantidad_total_animales += 1

#    # Construir el JSON de respuesta
#    resultados = {
#        'CantidadTotalProductores': cantidad_total_productores,
#        'CantidadTotalAnimales': cantidad_total_animales
#    }

#    # Devolver el JSON como respuesta
#    return JsonResponse(resultados,safe=False)