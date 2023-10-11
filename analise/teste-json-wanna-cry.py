#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd

df = pd.read_json('sample_wanna_cry.json',typ='series')
pulses = pd.DataFrame(df['results'])
pulses


# In[2]:


for index, row in pulses.iterrows():
    print("Row Index:", index)
    for column in pulses.columns:
        print(f"{column}: {row[column]}")
    print()


# In[3]:


dict_ind = dict(pulses['indicators'])
dict_ind


# In[4]:


indicators = []
for valor in dict_ind.values():
    for v in valor:
        indicators.append(v)


# In[5]:


indicators


# In[7]:


from collections import Counter

contador = Counter()

for conjunto_dicionario in indicators:
    for valor in conjunto_dicionario.values():
        contador[valor] += 1

# Imprimir as contagens
for valor, ocorrencias in contador.items():
    print(f'O valor {valor} ocorre {ocorrencias} vezes.')


# In[ ]:




