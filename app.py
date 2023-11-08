import json
import string
import nltk
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import joblib
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

# nltk.download('omw-1.4', download_dir='/tmp')

def stemming(text, model):
    nltk.download('stopwords', download_dir='/tmp')
    
    text = text.translate(str.maketrans('', '', string.punctuation))  #remove punctuation
    text = [word for word in text.split() if word.lower() not in stopwords.words('english')]  #remove stopwords
    words = ""
    stemmer = SnowballStemmer("english")
    for i in text:  #word stemming
            
            words += (stemmer.stem(i))+" "
    return words

def lemmatize(text, model):
    nltk.download('punkt', download_dir='/tmp')
    nltk.download('wordnet', download_dir='/tmp')
    return model.lemmatize(text)

class LdaModel:
    def __init__(self, filename):
        self.model = joblib.load(filename)
        self.stop_words = self.model['stop_words']
        self.acronyms = self.model['acronyms']
        self.id2word = self.model['dictionary']
        self.lda = self.model['lda']
        self.categories = self.model['categories']
        self.lemmatizer = WordNetLemmatizer()

    def predict(self, X):
        tokens = X[0]
        topics_probs = self.lda.get_document_topics(self.id2word.doc2bow(tokens), minimum_probability=0.0)
        max_prob_topic = 0
        for i, prob in topics_probs:
            if prob > topics_probs[max_prob_topic][1]:
                max_prob_topic = i
        self.predicted = self.categories[max_prob_topic]
        return self
    
    def lemmatize(self, text):
        tokens = word_tokenize(text)
        tokens = [token.lower() if token not in self.acronyms else token for token in tokens]
        tokens = [token for token in tokens if token not in self.stop_words]
        tokens = [token for token in tokens if token.isalpha()]
        tokens = [token for token in tokens if len(token) > 2 or token in self.acronyms]
        tokens = [token for token in tokens if not token.isdigit()]
        tokens = [self.lemmatizer.lemmatize(token) for token in tokens]
        return tokens

    def tolist(self):
        return [self.predicted]

def dummy_1d(x=None):
    return x

models = {
    "heart-disease":(joblib.load("./models/heart-disease.pkl"), ['age', 'sex', 'cp', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'thal'], None),
    "sms-spam":(joblib.load("./models/sms-spam.pkl"),['text'], stemming),
    "german-credit":(joblib.load("./models/german-credit.pkl"), ['Checking.Account', 'Duration', 'Credit.Hist', 'Purpose', 'Credit.Amount', 'Saving.Account', 'Employmnet', 'Disposable.Income','Personal.Status', 'Other.Debtors', 'Present.Residence', 'Property','Age', 'Other.Loans', 'Housing', 'Existing.Credits', 'Job','Number.Liable', 'Telephone', 'Foreign.Worker'], None),
    "wine-quality":(joblib.load("./models/wine-quality.pkl"), ['fixed.acidity', 'volatile.acidity', 'citric.acid', 'residual.sugar', 'chlorides', 'free.sulfur.dioxide', 'total.sulfur.dioxide', 'density', 'pH', 'sulphates', 'alcohol'], None),
    "bikeshare":(joblib.load("./models/bikeshare.pkl"), ['season','mnth','hr','holiday','weekday','workingday','weathersit','temp','atemp','hum','windspeed'], None),
    "bbc":(LdaModel("./models/bbc.pkl"), ['text'], lemmatize)
}

def lambda_handler(event, context):
    params = event.get('body')
    # print('params', params)
    if type(params) == str:
        params = json.loads(event.get('body'))

    model, feature_cols, pre_process = models.get(params.get('model'))

    X_input = []
    for name in feature_cols:
        if pre_process == None:
            X_input.append(params.get(name))
        else:
            X_input.append(pre_process(params.get(name), model))
        
    if pre_process == None:
        X_input = [X_input]
    #print(X_input)

    y_pred = model.predict(X_input).tolist()
    # print('y_pred', y_pred)

    response = {'y_pred': y_pred}
    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
