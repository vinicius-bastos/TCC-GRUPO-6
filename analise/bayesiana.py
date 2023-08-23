import os
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split

# Obter o diretório onde o script está localizado
script_directory = os.path.dirname(os.path.abspath(__file__))

# Caminho completo para o CSV
csv_path = os.path.join(script_directory, 'data', 'dados_pulses.csv')
df = pd.read_csv(csv_path)

# Dividir os dados em conjuntos de treinamento e teste
X = df['description']
y = df['tags'].apply(lambda x: 'malicious' if 'malicious' in x else 'non-malicious')
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

from sklearn.feature_extraction.text import TfidfVectorizer

# Aplicar TF-IDF na descrição dos pulses
tfidf_vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
X_test_tfidf = tfidf_vectorizer.transform(X_test)

from sklearn.naive_bayes import MultinomialNB

# Treinar o modelo Naive Bayes
nb_classifier = MultinomialNB()
nb_classifier.fit(X_train_tfidf, y_train)

from sklearn.metrics import accuracy_score, classification_report

# Previsões no conjunto de teste
y_pred = nb_classifier.predict(X_test_tfidf)

# Avaliar a acurácia e outras métricas
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f'Acurácia: {accuracy:.2f}')
print('Relatório de Classificação:\n', report)
