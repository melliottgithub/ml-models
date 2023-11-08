import unittest
import json
from app import lambda_handler

class TestModels(unittest.TestCase):
    
    def get_body(self, output):
        self.assertIsNotNone(output)
        self.assertEqual(output.get('statusCode'), 200)
        body = output.get('body')
        self.assertIsNotNone(body)
        body = json.loads(body)
        self.assertIsNotNone(body['y_pred'])
        
        return body
    
    def test_bbc(self):
        event = {
            "body": {
                "model": "bbc",
                "text": "The BBC is a British public service broadcaster. Its headquarters are at Broadcasting House in Westminster, London. It is the world's oldest national broadcasting organisation and the largest broadcaster in the world by number of employees. It employs over 20,950 staff in total, 16,672 of whom are in public sector broadcasting. The total number of staff is 35,402 when part-time, flexible, and fixed-contract staff are included. The BBC operates under its Agreement with the Secretary of State for Culture, Media and Sport. The BBC states that it is impartial and independent, although critics consider the broadcaster to be favourably conservative, due to its public funding and limited commercial advertising. It is sometimes claimed that the BBC exhibits a bias against organisations to the right of centre, particularly in matters of politics. The BBC is primarily funded by the television licence fee together with the BBC's other revenues.",
            }
        }
        body = self.get_body(lambda_handler(event, None))

        self.assertEqual(body['y_pred'][0], 'Political Elections/Parties')
        
    def test_heart_disease(self):
        event = {
            "body": {
                "model": "heart-disease",
                "age": 63,
                "sex": 1,
                "cp": 1,
                "chol": 233,
                "fbs": 1,
                "restecg": 2,
                "thalach": 150,
                "exang": 0,
                "thal": 6
            }
        }
        body = self.get_body(lambda_handler(event, None))
        self.assertEqual(body['y_pred'][0], 0)
        
    def test_sms_spam_1(self):
        event = {
            "body": {
                "model": "sms-spam",
                "text": "Hello there."
            }
        }
        body = self.get_body(lambda_handler(event, None))

        self.assertEqual(body['y_pred'][0], 'ham')
        
    def test_sms_spam_2(self):
        event = {
            "body": {
                "model": "sms-spam",
                "text": "more chances to win cash"
            }
        }
        body = self.get_body(lambda_handler(event, None))

        self.assertEqual(body['y_pred'][0], 'spam')
        
    def test_german_credit(self):
        event = {
            "body": {
                "model": "german-credit",
                "Checking.Account":"A11",
                "Duration":6,
                "Credit.Hist":"A34",
                "Purpose":"A43",
                "Credit.Amount":1169,
                "Saving.Account":"A65",
                "Employmnet":"A75",
                "Disposable.Income":4,
                "Personal.Status":"A93",
                "Other.Debtors":"A101",
                "Present.Residence":4,
                "Property":"A121",
                "Age":67,
                "Other.Loans":"A143",
                "Housing":"A152",
                "Existing.Credits":2,
                "Job":"A173",
                "Number.Liable":1,
                "Telephone":"A192",
                "Foreign.Worker":"A201"
            }
        }
        body = self.get_body(lambda_handler(event, None))

        self.assertEqual(body['y_pred'][0], 1)
        
    def test_bikeshare(self):
        event = {
            "body": {
                "model": "bikeshare",
                "season":1,
                "mnth":1,
                "hr":1,
                "holiday":0,
                "weekday":1,
                "workingday":1,
                "weathersit":1,
                "temp":0.22,
                "atemp":0.2121,
                "hum":0.64,
                "windspeed":0.2537
            }
        }
        body = self.get_body(lambda_handler(event, None))
        error_pct = (body['y_pred'][0] - 7) / 7
        self.assertLessEqual(error_pct, .38)
        
    def test_wine_quality(self):
        event = {
            "body": {
                "model": "wine-quality",
                "fixed.acidity":7.4,
                "volatile.acidity":0.7,
                "citric.acid":0.0,
                "residual.sugar":1.9,
                "chlorides":0.076,
                "free.sulfur.dioxide":11.0,
                "total.sulfur.dioxide":34.0,
                "density":0.9978,
                "pH":3.51,
                "sulphates":0.56,
                "alcohol":9.4
            }
        }
        body = self.get_body(lambda_handler(event, None))
        print(body)

        self.assertEqual(body['y_pred'][0], 0)        
