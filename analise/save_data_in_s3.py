import boto3
import os
import json
from datetime import datetime  # Importa a classe datetime do módulo datetime
from dynamodb_json import json_util

from extract_data import get_all_items  # Importa o método get_all_items do arquivo extract_data.py

# Configurações do S3
s3 = boto3.client('s3')
bucket_name = 'call-alien-vault-tcc-dev-main-pulses'
folder_name = 'subscribed_general'


# Método para criar a pasta no S3
def create_folder(bucket, folder):
    try:
        s3.put_object(Bucket=bucket, Key=(folder + '/'))
    except Exception as e:
        print(f"Erro ao criar a pasta {folder}: {str(e)}")

# Chama o método para criar a pasta
create_folder(bucket_name, folder_name)

# Obtém a lista de JSON do método get_all_items
lista_de_json = get_all_items('call-alien-vault-tcc-dev-pulses-subscribed')  # Use o nome correto da tabela

# Função para serializar objetos datetime
def serialize_datetime(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

# Método para inserir cada JSON na pasta criada no S3
def insert_json_into_s3(bucket, folder, json_data):
    try:
        for index, json_item in enumerate(json_data):
            # Serializa objetos datetime antes de transformá-los em JSON
            json_item_common = json_util.loads(json_item)
            json_item_serialized = json.dumps(json_item_common, default=serialize_datetime)
            json_filename = f'{folder}/{index + 1}.json'
            s3.put_object(Bucket=bucket, Key=json_filename, Body=json_item_serialized)
            print(f"JSON {index + 1} inserido em {json_filename}")
    except Exception as e:
        print(f"Erro ao inserir JSON no S3: {str(e)}")

# Chama o método para inserir os JSONs na pasta
insert_json_into_s3(bucket_name, folder_name, lista_de_json)
