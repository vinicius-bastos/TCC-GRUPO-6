import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder

# Obter o caminho absoluto do diretório onde este script está localizado
script_directory = os.path.dirname(os.path.abspath(__file__))

# Caminho completo para o arquivo CSV
csv_path = os.path.join(script_directory, 'data', 'dados_pulses.csv')

# Carregar o CSV
data = pd.read_csv(csv_path)
print(data)

# Remover linhas com valores ausentes (NaN)
data = data.dropna()

print(data)

# Dividir os dados em atributos (X) e rótulos (y)
X = data['Description']
y = data['Adversary']

# Codificar os rótulos em valores numéricos
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Dividir os dados em conjunto de treinamento e conjunto de teste
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Vetorizar os textos das descrições
vectorizer = CountVectorizer()
X_train_vectorized = vectorizer.fit_transform(X_train)
X_test_vectorized = vectorizer.transform(X_test)
print(X_train_vectorized)
print(X_test_vectorized)

# Agora você tem X_train_vectorized e X_test_vectorized para usar no treinamento do modelo