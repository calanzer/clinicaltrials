import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import xml.etree.ElementTree as ET

#Read XML File 
root = ET.parse('NCT00000102.xml').getroot()
download_date = root.find('required_header/download_date')
download_date_text = download_date.text
print(download_date_text)

"""
for type_tag in root.findall('bar/type'):
    value = type_tag.get('foobar')
    print(value)



# Use a service account
cred = credentials.Certificate('find-clinical-trials-d08ad69da614.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

data = {
    u'name': u'Los Angeles',
    u'state': u'CA',
    u'country': u'USA'
}

db.collection(u'All Studies').document(u'Study').set(data)
"""
