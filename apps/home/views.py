# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""
import pytz
from django import template
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.contrib.auth.decorators import login_required
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1.document import DocumentReference

# CONFIGURACIÓN FIREBASE
cred = credentials.Certificate(r'C:\Users\Patricio Arias\Documents\proyectos programacion\pumbapp\PumbappWeb\core\pumbapp-5cf99-firebase-adminsdk-b345t-f3f2056e6e.json')
firebase_admin.initialize_app(cred,name='Json')
db = firestore.client()



# TABLA ANIMALOS PRODUCTORES
@login_required(login_url="/login/")
@require_GET
def tabla(request):
    # LEER TODOS LOS DOCUMENTOS DE UNA COLECCIÓN
    productores_docs = db.collection('Productor').get()

    # Lista para almacenar instancias de Productor con contador por Tipo en Registro_Animal
    productores_registros_animales = []

    for productor_doc in productores_docs:
        productor_data = productor_doc.to_dict()

        # Obtener el ID del productor
        id_productor = productor_doc.id

        # Consultar la subcolección 'Registro_Animal' de este productor
        animales_query = db.collection('Productor').document(id_productor).collection('Registro_Animal').get()

        # Contadores por Tipo en Registro_Animal
        contador_tipo = {}

        # Iterar sobre los documentos de la subcolección 'Registro_Animal' y actualizar el contador
        for animal_doc in animales_query:
            animal_data = animal_doc.to_dict()
            tipo_animal = animal_data.get('Tipo', '')

            # Incrementar el contador del Tipo actual
            contador_tipo[tipo_animal] = contador_tipo.get(tipo_animal, 0) + 1

        # Agregar el campo 'display_name' asociado a la colección 'Productor'
        productor_data['display_name'] = productor_data.get('display_name', '')

        # Crear una instancia de la clase Productor con el contador por Tipo
        productor_registro_animal = {
            'ID': id_productor,
            'display_name': productor_data['display_name'],
            'ContadorTipo': contador_tipo,

        }

        # Agregar la instancia a la lista
        productores_registros_animales.append(productor_registro_animal)

    # Devolver el JSON como respuesta
    return JsonResponse(productores_registros_animales, safe=False)

   # # LEER TODOS LOS DOCUMENTOS DE LA COLECCIÓN 'Productor'
   # productores = db.collection('Productor').get()
#
   # # Diccionario para almacenar el nombre del productor y la cantidad de registros animales por tipo
   # resultados_por_productor = {}
#
   # # Iterar sobre los documentos de la colección 'Productor'
   # for productor in productores:
   #     # Obtener el ID y nombre del productor
   #     id_productor = productor.id
   #     nombre_productor = productor.get('nombre', '')
#
   #     # Realizar una subconsulta para obtener los registros animales asociados a este productor
   #     registros_animales_productor = db.collection('Registro_Animal').where('id_productor', '==', id_productor).get()
#
   #     # Diccionario para almacenar la cantidad de registros animales por tipo para este productor
   #     contador_por_tipo = {}
#
   #     # Iterar sobre los registros animales y contar por tipo
   #     for registro_animal_doc in registros_animales_productor:
   #         data = registro_animal_doc.to_dict()
   #         tipo = data.get('Tipo', '')
#
   #         # Incrementar el contador por tipo
   #         contador_por_tipo[tipo] = contador_por_tipo.get(tipo, 0) + 1
#
   #     # Almacenar los resultados por productor
   #     resultados_por_productor[nombre_productor] = contador_por_tipo
#
   # # Devolver el JSON como respuesta
   # return JsonResponse(resultados_por_productor,safe=False)






#NOTIFICACIONES

@login_required(login_url="/login/")
@require_GET
def notificaciones(request):
    try:
        # Obtener todos los documentos de la colección 'Productor'
        productores_docs = db.collection('Productor').get()

        registros_notificaciones = []

        # Iterar sobre los documentos de la colección 'Productor'
        for productor_doc in productores_docs:
            # Obtener el ID del productor
            id_productor = productor_doc.id

            # Obtener el campo 'display_name' de la colección 'Productor'
            display_name = productor_doc.get('display_name')

            # Obtener la referencia al documento del productor
            productor_ref = db.collection('Productor').document(id_productor)

            # Realizar subconsultas para obtener los registros de cada subcolección asociada a este productor
            registros_monta_query = productor_ref.collection('Registro_Monta').order_by('Fecha_Monta').get()
            registros_vacunas_query = productor_ref.collection('Vacunas').order_by('Fecha_Creacion').get()
            registros_parto_query = productor_ref.collection('Registro_Parto').order_by('Fecha_Parto').get()
            registros_destete_query = productor_ref.collection('Registro_Animal').where('Estado_Animal', '==', 'Destete').get()

            # Lista para almacenar los datos de monta para este productor
            datos_monta_productor = []
            for registro_monta_doc in registros_monta_query:
                data_monta = registro_monta_doc.to_dict()
                datos_monta = {
                    "timestamp": data_monta.get('Fecha_Monta'),
                    # Agrega más campos según sea necesario
                }
                datos_monta_productor.append(datos_monta)

            # Lista para almacenar los datos de vacunas para este productor
            datos_vacunas_productor = []
            for registro_vacunas_doc in registros_vacunas_query:
                data_vacunas = registro_vacunas_doc.to_dict()
                datos_vacunas = {
                    "timestamp": data_vacunas.get('Fecha_Creacion'),
                    # Agrega más campos según sea necesario
                }
                datos_vacunas_productor.append(datos_vacunas)

            # Lista para almacenar los datos de parto para este productor
            datos_parto_productor = []
            for registro_parto_doc in registros_parto_query:
                data_parto = registro_parto_doc.to_dict()
                datos_parto = {
                    "timestamp": data_parto.get('Fecha_Parto'),
                    # Agrega más campos según sea necesario
                }
                datos_parto_productor.append(datos_parto)

            # Lista para almacenar los datos de destete para este productor
            datos_destete_productor = []
            for registro_destete_doc in registros_destete_query:
                data_destete = registro_destete_doc.to_dict()
                datos_destete = {
                    "estado_animal": data_destete.get('Estado_Animal'),
                    # Agrega más campos según sea necesario
                }
                datos_destete_productor.append(datos_destete)

            # Agregar la instancia a la lista
            registros_notificaciones.append({
                'ID': id_productor,
                'display_name': display_name,
                'Fecha_Monta': datos_monta_productor[0]['timestamp'] if datos_monta_productor else '',
                'Fecha_Vacunas': datos_vacunas_productor[0]['timestamp'] if datos_vacunas_productor else '',
                'Fecha_Parto': datos_parto_productor[0]['timestamp'] if datos_parto_productor else '',
                'Estado_Destete': datos_destete_productor[0]['estado_animal'] if datos_destete_productor else '',
            })

        # Devolver el JSON como respuesta
        return JsonResponse(registros_notificaciones, safe=False)

    except Exception as e:
        # Manejar errores, por ejemplo, devolver un JSON con un mensaje de error
        return JsonResponse({'error': str(e)}, status=500)
# CONTADOR TOTAL
@login_required(login_url="/login/")
@require_GET
def contadorTotal(request):
    # Obtener datos de notificaciones desde Firebase o tu fuente de datos
    productores_query = db.collection('Productor').get()

    # Contador para la cantidad total de productores
    cantidad_total_productores = 0

    # Contador para la cantidad total de animales
    cantidad_total_animales = 0

    # Iterar sobre los documentos de la colección 'Productor'
    for productor in productores_query:
        cantidad_total_productores += 1

        # Obtener el ID del productor
        id_productor = productor.id

        # Consultar la subcolección 'Registro_Animal' de este productor
        animales_query = db.collection('Productor').document(id_productor).collection('Registro_Animal').get()

        # Iterar sobre los documentos de la subcolección 'Registro_Animal' y sumar al contador
        for animal in animales_query:
            cantidad_total_animales += 1

    # Construir el JSON de respuesta
    resultados = {
        'CantidadTotalProductores': cantidad_total_productores,
        'CantidadTotalAnimales': cantidad_total_animales
    }

    # Devolver el JSON como respuesta
    return JsonResponse(resultados, safe=False)

# ACCOUNT CHART  (INDICE PROMEDIO NATALIDAD)
@login_required(login_url="/login/")
@require_GET
def indiceNatalidad(request):
    # Obtener todos los documentos de la colección 'Productor'
    productores = db.collection('Productor').get()

    datosParto = []

    # Zona horaria UTC-3 para Santiago, Chile
    tz_utc_menos_3 = pytz.timezone('America/Santiago')

    # Iterar sobre los documentos de la colección 'Productor'
    for productor in productores:
        # Obtener el ID del productor
        id_productor = productor.id

        # Obtener la referencia al documento del productor
        productor_ref = db.collection('Productor').document(id_productor)

        # Obtener display_name del documento actual
        display_name = productor.to_dict().get('display_name', '')

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
            fecha_parto_utc_menos_3 = fecha_parto_original.replace(tzinfo=pytz.utc).astimezone(tz_utc_menos_3)

            # Estructurar los datos de parto según tus necesidades
            datos_parto = {
                "nombreProductor": display_name,
                "Productor": id_productor,
                "FechaParto": fecha_parto_utc_menos_3.strftime('%Y-%m-%d'),  # Formatear la fecha según tus necesidades
                "Cantidad_hijosMUERTOS": data_parto.get('Cantidad_hijosMUERTOS', ''),
                "Cantidad_hijosTOTAL": data_parto.get('Cantidad_hijosTOTAL', ''),
                "Cantidad_hijosVIVOS": data_parto.get('Cantidad_hijosVIVOS', ''),
                # Agrega más campos según sea necesario
            }

            # Agregar los datos de parto a la lista
            datos_parto_productor.append(datos_parto)

        # Agregar los datos de parto para este productor a la lista general
        datosParto.append(datos_parto_productor)

    # Devolver el JSON como respuesta
    return JsonResponse(datosParto, safe=False)
##########Visualizaciones

# LINE CHART 1 Cantidad lechones por productor
@login_required(login_url="/login/")
@require_GET
def Lechones(request):
    # Obtener datos de notificaciones desde Firebase o tu fuente de datos
    docs = db.collection('').get()

    datosLechones = []

    for doc in docs:
        data = doc.to_dict()

        datoLechon = [
            {"mensaje": "Nuevo mensaje 1", "timestamp": "Justo ahora"},
            {"mensaje": "Nuevo mensaje 2", "timestamp": "hace 2 horas"},
            # Agrega más datos según sea necesario
        ]

        datosLechones.append(datoLechon)

        # Devolver el JSON como respuesta
        return JsonResponse(datosLechones, safe=False)




# AREA CHART 1 NATLIDAD vs MORTALIDAD
@login_required(login_url="/login/")
@require_GET
def natalidadVsMortalidad(request):
    # Obtener datos de notificaciones desde Firebase o tu fuente de datos
    docs = db.collection('').get()

    datosNatalidadMortalidad = []

    for doc in docs:
        data = doc.to_dict()

        datoRegistroParto = [
            {"mensaje": "Nuevo mensaje 1", "timestamp": "Justo ahora"},
            {"mensaje": "Nuevo mensaje 2", "timestamp": "hace 2 horas"},
            # Agrega más datos según sea necesario
        ]

        datosNatalidadMortalidad.append(datoRegistroParto)

        # Devolver el JSON como respuesta
        return JsonResponse(datosNatalidadMortalidad, safe=False)



# BAR CHART 1 TOTAL ANIMALES GRAFICO
@login_required(login_url="/login/")
@require_GET
def totalAnimal(request):
    # Obtener datos de notificaciones desde Firebase o tu fuente de datos
    docs = db.collection('').get()

    totalAnimales = []

    for doc in docs:
        data = doc.to_dict()

        animalesProductor = [
            {"mensaje": "Nuevo mensaje 1", "timestamp": "Justo ahora"},
            {"mensaje": "Nuevo mensaje 2", "timestamp": "hace 2 horas"},
            # Agrega más datos según sea necesario
        ]

        totalAnimales.append(animalesProductor)

        # Devolver el JSON como respuesta
        return JsonResponse(totalAnimales, safe=False)




# PIE CHART 2 % ANIMALES
@login_required(login_url="/login/")
@require_GET
def porcentajeAnimal(request):
    # Obtener datos de notificaciones desde Firebase o tu fuente de datos
    docs = db.collection('').get()

    datosAnimalProductor = []

    for doc in docs:
        data = doc.to_dict()

        datoAnimal = [
            {"mensaje": "Nuevo mensaje 1", "timestamp": "Justo ahora"},
            {"mensaje": "Nuevo mensaje 2", "timestamp": "hace 2 horas"},
            # Agrega más datos según sea necesario
        ]

        datosAnimalProductor.append(datoAnimal)

        # Devolver el JSON como respuesta
        return JsonResponse(datosAnimalProductor, safe=False)







#################################
@login_required(login_url="/login/")
def index(request):
    context = {'segment': 'index'}

    html_template = loader.get_template('home/index.html')
    return HttpResponse(html_template.render(context, request))




@login_required(login_url="/login/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:

        load_template = request.path.split('/')[-1]

        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        context['segment'] = load_template

        html_template = loader.get_template('home/' + load_template)
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('home/page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('home/page-500.html')
        return HttpResponse(html_template.render(context, request))
