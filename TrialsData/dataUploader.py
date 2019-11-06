import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import xml.etree.ElementTree as ET

#Read XML File 
root = ET.parse('NCT00000102.xml').getroot()
#Set download date and print value
overall_status = root.find('overall_status').text
#Set brief title variable
brief_title = root.find('brief_title').text
#Set eligibility criteria text
eligibility = root.find('eligibility/criteria/textblock').text

# Import credentials from credentials file
cred = credentials.Certificate('find-clinical-trials-d08ad69da614.json')
#Initialize database connection with credentials
firebase_admin.initialize_app(cred)
#Initialize database object
db = firestore.client()
#Set data that will be sent to the database.
data = {
    u'brief_title': brief_title,
    u'overall_status': overall_status,
    u'eligibility': eligibility
}
#Insert data.
db.collection(u'All Studies').document(u'Study').set(data)
