import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
import urllib.request
from datetime import date, timedelta

cred = credentials.Certificate('clinicaltrials-ae8f9-firebase-adminsdk-2wm4m-8b19b98626.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
update_date = date.today() - timedelta(days=1)
update_date = update_date.strftime("%B %d, %Y")
update_date = update_date.replace(" ", "%20")
print(update_date)
min_rnk = 1
max_rnk = 100
url = 'https://ClinicalTrials.gov/api/query/full_studies?min_rnk='+str(min_rnk)+'&max_rnk='+str(max_rnk)+'&expr=AREA[LastUpdatePostDate]' + update_date + '&fmt=json'

#Read JSON File
with urllib.request.urlopen(url) as response:
          html = response.read()
print(url)
root = json.loads(html.decode('utf-8'))
number_updates = root["FullStudiesResponse"]["NStudiesFound"]
root = root["FullStudiesResponse"]["FullStudies"]

while max_rnk < number_updates:

     #Loop through each study in resposne
     for study in root:
          NCTId = study["Study"]["ProtocolSection"]["IdentificationModule"]["NCTId"]
          if NCTId != None:
               db.collection(u'trials').document(NCTId).set(study)
     min_rnk += 100
     max_rnk += 100
     with urllib.request.urlopen('https://ClinicalTrials.gov/api/query/full_studies?min_rnk='+str(min_rnk)+'&max_rnk='+str(max_rnk)+'&expr=AREA[LastUpdatePostDate]' + update_date + '&fmt=json') as response:
          html = response.read()

     root = json.loads(html.decode('utf-8'))
     number_updates = root["FullStudiesResponse"]["NStudiesFound"]
     root = root["FullStudiesResponse"]["FullStudies"]


