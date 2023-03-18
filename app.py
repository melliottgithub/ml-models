import json
import string
import pandas as pd
import nltk
from sklearn.pipeline import make_pipeline
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

nltk.download('stopwords', download_dir='/tmp')

def stemming(text):
    
    text = text.translate(str.maketrans('', '', string.punctuation))  #remove punctuation
    text = [word for word in text.split() if word.lower() not in stopwords.words('english')]  #remove stopwords
    words = ""
    stemmer = SnowballStemmer("english")
    for i in text:  #word stemming
            
            words += (stemmer.stem(i))+" "
    return words

def dummy_1d(x):
    return x

models = {
    "heart-disease":(joblib.load("./models/heart-disease.pkl"), ['age', 'sex', 'cp', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'thal'], None),
    "sms-spam":(joblib.load("./models/sms-spam.pkl"),['text'], stemming),
    "german-credit":(joblib.load("./models/german-credit.pkl"), ['Checking.Account', 'Duration', 'Credit.Hist', 'Purpose', 'Credit.Amount', 'Saving.Account', 'Employmnet', 'Disposable.Income','Personal.Status', 'Other.Debtors', 'Present.Residence', 'Property','Age', 'Other.Loans', 'Housing', 'Existing.Credits', 'Job','Number.Liable', 'Telephone', 'Foreign.Worker'], dummy_1d),
    "wine-quality":(joblib.load("./models/wine-quality.pkl"), ['fixed.acidity', 'volatile.acidity', 'citric.acid', 'residual.sugar', 'chlorides', 'free.sulfur.dioxide', 'total.sulfur.dioxide', 'density', 'pH', 'sulphates', 'alcohol'], None),
    "bikeshare":(joblib.load("./models/bikeshare.pkl"), ['season','mnth','hr','holiday','weekday','workingday','weathersit','temp','atemp','hum','windspeed'], None)
}

def lambda_handler(event, context):
    params = event.get('body')
    print('params', params)
    if type(params) == str:
        params = json.loads(event.get('body'))

    model, feature_cols, pre_process = models.get(params.get('model'))

    X_input = []
    for name in feature_cols:
        if pre_process == None:
            X_input.append(params.get(name))
        else:
            X_input.append(pre_process(params.get(name)))
        
    if pre_process == None:
        X_input = [X_input]
    print(X_input)

    y_pred = model.predict(X_input).tolist()
    print('y_pred', y_pred)

    response = {'y_pred': y_pred}
    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
