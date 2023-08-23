import os
import pandas as pd
from extract_data import get_all_items

# Obter o caminho absoluto do diretório onde este script está localizado
script_directory = os.path.dirname(os.path.abspath(__file__))

# Nome da sua tabela
table_name = 'call-alien-vault-tcc-dev-pulses-subscribed'

try:
    items_list = get_all_items(table_name)
    
    # Criar listas vazias para as colunas do CSV
    ids = []
    author_names = []
    created_dates = []
    descriptions = []
    tags = []
    indicators = []

    for items in items_list:
        for item in items['results']['L']:
            result_data = item.get('M', {})
            
            # Extrair dados relevantes do item
            ids.append(result_data.get('id', {}).get('S', ''))
            author_names.append(result_data.get('author_name', {}).get('S', ''))
            created_dates.append(result_data.get('created', {}).get('S', ''))
            descriptions.append(result_data.get('description', {}).get('S', ''))

            # Extract indicators as a list and join them with semicolon
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
            tags.append('')  # Add an empty value for the 'Tags' column
    
    # Criar um DataFrame do pandas com os dados extraídos
    data = {
        'ID': ids,
        'Author Name': author_names,
        'Created Date': created_dates,
        'Description': descriptions,
        'Tags': tags,
        'Indicators': indicators
    }

    df = pd.DataFrame(data)
    
    # Diretório onde será salvo o arquivo CSV
    save_directory = os.path.join(script_directory, 'data')
    os.makedirs(save_directory, exist_ok=True)

    # Caminho completo para o arquivo CSV
    csv_path = os.path.join(save_directory, 'dados_pulses.csv')

    # Salvar o DataFrame em um arquivo CSV
    df.to_csv(csv_path, index=False)
    print(f"Dados salvos em {csv_path}")

except Exception as e:
    print("Erro:", e)
