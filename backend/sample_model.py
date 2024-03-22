from urllib.parse import unquote
from fuzzywuzzy import fuzz, process
import pandas as pd
import re
import warnings
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.multioutput import MultiOutputClassifier
from sklearn.svm import SVC
import string


# Suppress DtypeWarning
warnings.filterwarnings("ignore", category=pd.errors.DtypeWarning)

# Read data from CSV file with explicit data type specification
attractions_data = pd.read_csv('C:\\IIT\\second_year\\SDGP\\RoamRoutely\\dataset\\dataset.csv', dtype={'Attractions': str})

# Load the dataset
destination = pd.read_csv('C:\\IIT\\second_year\\SDGP\\RoamRoutely\\dataset\\dataset.csv')

# Separate features (X) and target variables (Y)
X = destination['District']
Y = destination[['Shopping_Places', 'Religious_Attractions', 'Cultural_Attractions', 'Educational_Places', 'Fun_And_Family']]

# Vectorize the chemical names using bag-of-words representation
vectorizer = CountVectorizer()
X_vectorized = vectorizer.fit_transform(X)

# Train multi-output classifier with SVM classifiers
classifier = MultiOutputClassifier(SVC())
classifier.fit(X_vectorized, Y)

# Set to store processed queries
processed_queries = set()
processed_attractions = set()

# Function to tokenize attractions
def tokenize_attraction_name(attraction):
    attraction = attraction.translate(str.maketrans('', '', string.punctuation))
    tokens = re.split(r'[\s\-/]', attraction)
    # Remove empty tokens
    tokens = [token.strip() for token in tokens if token.strip()]
    return tokens

# Function to match input attraction name with database
def match_attraction_name(input_attraction):
    # Normalize and tokenize input
    input_tokens = tokenize_attraction_name(input_attraction.lower())

    matched_attractions = set()
    # Exact string matching
    exact_matches = attractions_data[attractions_data['District'].str.lower() == input_attraction]
    matched_attractions.update(exact_matches['District'].tolist())

    # Fuzzy string matching with tokenized names
    for name in attractions_data['District']:
        if pd.notna(name): 
            name_tokens = tokenize_attraction_name(name.lower())
            if all(token in name_tokens for token in input_tokens):
                matched_attractions.add(name)

    # If no exact matches found, use fuzzy matching
    if not matched_attractions:
        fuzzy_matches = process.extract(input_attraction, attractions_data['District'], limit=5)
        matched_attractions.update([match[0] for match in fuzzy_matches if match[1] == 100])

    return list(matched_attractions), input_attraction


def predict(input_attraction):
    # Vectorize the input attraction name
    attraction_vectorized = vectorizer.transform([input_attraction])

    # Predictions for the input attraction name
    predictions = classifier.predict(attraction_vectorized)[0]

    return {
        'Shopping_Places': predictions[3],
        'Religious_Attractions': predictions[4],
        'Cultural_Attractions': predictions[5],
        'Educational_Places': predictions[6],
        'Fun_And_Family': predictions[7]
    }
