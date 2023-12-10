import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

# CONFIGURACIÓN FIREBASE
cred = credentials.Certificate(r'C:\Users\patri\OneDrive\Escritorio\sistema web django Pumbapp\django-dashboard-kit\core\pumbapp-5cf99-firebase-adminsdk-b345t-f3f2056e6e.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

class RegistroAnimal:
    def __init__(self, peso, tipo):
        self.peso = peso
        self.tipo = tipo

# Obtener la referencia al documento del productor
productor_id = "vi4nn93vwAe0Bf3jBmTPhJNRIuy2"
productor_ref = db.collection('Productor').document(productor_id)

# Obtener la colección Registro_Animal dentro del documento del productor
registro_animal_docs = productor_ref.collection('Registro_Animal').get()

# Lista para almacenar instancias de RegistroAnimal
registros_animales = []

for doc in registro_animal_docs:
    data = doc.to_dict()
    registro_animal = RegistroAnimal(
        peso=data.get('Peso', ''),  # Utiliza un valor predeterminado en caso de que 'Peso' no esté presente
        tipo=data.get('Tipo', '')
    )
    registros_animales.append(registro_animal)

# Contar la cantidad de veces que se repite la variable 'tipo'
contador_tipos = {}
for registro_animal in registros_animales:
    tipo = registro_animal.tipo.lower()  # Considerar mayúsculas y minúsculas
    if tipo not in contador_tipos:
        contador_tipos[tipo] = 1
    else:
        contador_tipos[tipo] += 1

# Crear una lista de diccionarios para el resultado final
resultado_final = []
for tipo, cantidad in contador_tipos.items():
    resultado_final.append({
        'producto': f'{productor_id}',  # Producto es una combinación de ID del productor y el tipo del animal
        'tipo': tipo.capitalize(),
        'cantidad': cantidad
    })

# Guardar el resultado final en un archivo JSON
with open('resultado_final.json', 'w') as json_file:
    json.dump(resultado_final, json_file, indent=2)

print("JSON guardado en 'resultado_final.json'")


#LEER una coleccion por 1 documento
'''result = db.collection('Productor').document("yYk4BH7IR2caSrcjWUoLypIn8b73").get()
if result.exists:
    print(result.to_dict())'''


#CONSULTA ESPECIFICA  (busqueda)
'''docs =  db.collection('Registro_Animal').where("Estado_Animal","==","Lechon").get()
for doc in docs:
    print(doc.to_dict())'''
# == igual; != distinto ; > Mayor ; < Menor ; >= Mayor o igual ; <= Menor o igual

