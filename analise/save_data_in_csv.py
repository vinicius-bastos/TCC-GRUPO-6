import os
import pandas as pd
from extract_data import get_all_items
import json

# Obter o caminho absoluto do diretório onde este script está localizado
script_directory = os.path.dirname(os.path.abspath(__file__))

# Nome da sua tabela
table_name = 'call-alien-vault-tcc-dev-pulses-subscribed'

try:
    items_list = get_all_items(table_name)
    
    # Criar listas vazias para as colunas do CSV principal e do CSV wanna cry
    ids = []
    author_names = []
    created_dates = []
    descriptions = []
    tags = []
    indicators = []
    
    ids_wanna_cry = []
    author_names_wanna_cry = []
    created_dates_wanna_cry = []
    descriptions_wanna_cry = []
    tags_wanna_cry = []
    indicators_wanna_cry = []

    for items in items_list:
        for item in items['results']['L']:
            result_data = item.get('M', {})
            
            # Extrair dados relevantes do item
            ids.append(result_data.get('id', {}).get('S', ''))
            author_names.append(result_data.get('author_name', {}).get('S', ''))
            created_dates.append(result_data.get('created', {}).get('S', ''))
            descriptions.append(result_data.get('description', {}).get('S', ''))
            
            # Extrair tags como uma lista e unir com ponto e vírgula
            tags_list = result_data.get('tags', {}).get('L', [])
            tags_string = ';'.join([tag.get('S', '') for tag in tags_list])
            tags.append(tags_string)
            
            # Extrair indicators como uma lista e unir com ponto e vírgula
            indicators_list = result_data.get('indicators', {}).get('L', [])
            indicator_strings = []
            for ind in indicators_list:
                indicator_data = ind.get('M', {})
                indicator_id = indicator_data.get('id', {}).get('N', '')
                indicator_content = indicator_data.get('content', {}).get('S', '')
                indicator_created = indicator_data.get('created', {}).get('S', '')
                indicator_description = indicator_data.get('description', {}).get('S', '')
                indicator_expiration = indicator_data.get('expiration', {}).get('NULL', '')
                indicator_value = indicator_data.get('indicator', {}).get('S', '')
                indicator_is_active = indicator_data.get('is_active', {}).get('N', '')
                indicator_role = indicator_data.get('role', {}).get('NULL', '')
                indicator_title = indicator_data.get('title', {}).get('S', '')
                indicator_type = indicator_data.get('type', {}).get('S', '')

                indicator_string = (
                    f"id:{indicator_id};"
                    f"content:{indicator_content};"
                    f"created:{indicator_created};"
                    f"description:{indicator_description};"
                    f"expiration:{indicator_expiration};"
                    f"indicator:{indicator_value};"
                    f"is_active:{indicator_is_active};"
                    f"role:{indicator_role};"
                    f"title:{indicator_title};"
                    f"type:{indicator_type}"
                )
                indicator_strings.append(indicator_string)
            indicators.append(';'.join(indicator_strings))
    
    # Carregar o arquivo JSON de amostra
    json_file_path = os.path.join(script_directory, 'data', 'sample_wanna_cry.json')
    with open(json_file_path, 'r') as json_file:
        json_data = json.load(json_file)

    # Extrair informações do arquivo JSON e adicionar ao DataFrame (conforme as instruções anteriores)
    for result in json_data['results']:
        ids_wanna_cry.append(result.get('id', ''))
        author_names_wanna_cry.append(result.get('author_name', ''))
        created_dates_wanna_cry.append(result.get('created', ''))
        descriptions_wanna_cry.append(result.get('description', ''))
        tags_list = result.get('tags', [])
        tags_wanna_cry.append(';'.join(tags_list))
        
        indicators_list = result.get('indicators', [])
        indicator_strings = []
        for ind in indicators_list:
            indicator_data = ind
            indicator_string = (
                f"id:{indicator_data.get('id')};"
                f"content:{indicator_data.get('indicator')};"
                f"created:{indicator_data.get('created')};"
                f"description:{indicator_data.get('description')};"
                f"expiration:{indicator_data.get('expiration')};"
                f"indicator:{indicator_data.get('indicator')};"
                f"is_active:{indicator_data.get('is_active')};"
                f"role:{indicator_data.get('role')};"
                f"title:{indicator_data.get('title')};"
                f"type:{indicator_data.get('type')}"
            )
            indicator_strings.append(indicator_string)
        indicators_wanna_cry.append(';'.join(indicator_strings))
    
    # Criar DataFrames do pandas com os dados extraídos
    data = {
        'ID': ids,
        'Author Name': author_names,
        'Created Date': created_dates,
        'Description': descriptions,
        'Tags': tags,
        'Indicators': indicators
    }

    df = pd.DataFrame(data)
    
    data_wanna_cry = {
        'ID': ids_wanna_cry,
        'Author Name': author_names_wanna_cry,
        'Created Date': created_dates_wanna_cry,
        'Description': descriptions_wanna_cry,
        'Tags': tags_wanna_cry,
        'Indicators': indicators_wanna_cry
    }

    df_wanna_cry = pd.DataFrame(data_wanna_cry)
    
    # Diretório onde será salvo o arquivo CSV
    save_directory = os.path.join(script_directory, 'data')
    os.makedirs(save_directory, exist_ok=True)

    # Caminhos completos para os arquivos CSV
    csv_path = os.path.join(save_directory, 'dados_pulses.csv')
    csv_path_wanna_cry = os.path.join(save_directory, 'dados_pulses_wanna_cry.csv')

    # Salvar os DataFrames em arquivos CSV
    df.to_csv(csv_path, index=False)
    df_wanna_cry.to_csv(csv_path_wanna_cry, index=False)
    print(f"Dados salvos em {csv_path}")
    print(f"Dados do WannaCry salvos em {csv_path_wanna_cry}")

except Exception as e:
    print("Erro:", e)
