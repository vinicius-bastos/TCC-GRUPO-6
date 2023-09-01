import os
import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules

script_directory = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(script_directory, 'data', 'dados_pulses_wanna_cry.csv')
data = pd.read_csv(csv_path)

data['Indicators'] = data['Indicators'].str.split(';')

# Certifique-se de que os valores em 'Tags' sejam strings
data['Tags'] = data['Tags'].astype(str)

# Vamos criar colunas binárias para cada tag possível
tags = data['Tags'].str.split(';')  # Dividir as tags em uma lista

# Criar um conjunto (set) para coletar todas as tags únicas
unique_tags = set()
for tag_list in tags:
    unique_tags.update(tag_list)

# Criar colunas binárias para cada tag e inicializá-las com False
for tag in unique_tags:
    data[tag] = False

# Preencher as colunas binárias com True onde a tag está presente
for i, tag_list in enumerate(tags):
    for tag in tag_list:
        data.at[i, tag] = True

frequent_itemsets = apriori(data.drop(['ID', 'Author Name', 'Created Date', 'Description', 'Tags', 'Indicators'], axis=1), min_support=0.1, use_colnames=True)
if not frequent_itemsets.empty:
    rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1.0)
    print(rules)


