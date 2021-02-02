import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
import json

path_to_jsonfolder = '/Users/christianlanzer/Downloads/AllAPIJSON/NCT0470xxxx'
path_to_jsonfile = "NCT00000102.json"
firestoreCredentialsFile = '/Users/christianlanzer/Documents/Coding_Projects/clinicaltrials/TrialsData/clinicaltrials-ae8f9-firebase-adminsdk-2wm4m-8b19b98626.json'

def uploadStudiesFolder():
     db = firestoreSignIn(firestoreCredentialsFile)
     for file in os.listdir(path_to_jsonfolder):
          full_filename = "%s/%s" % (path_to_jsonfolder, file)
          print("Insert data to database from file: " + full_filename)
          with open(full_filename,'r') as fi:
               root = json.loads(fi.read())
               NCTId = root["FullStudy"]["Study"]["ProtocolSection"]["IdentificationModule"]["NCTId"]
               #Insert data.
               if NCTId != None:
                     db.collection(u'trials').document(NCTId).set(root)

def uploadIndividualStudy():
     db = firestoreSignIn(firestoreCredentialsFile)
     with open(path_to_jsonfile, 'r') as j:
          root = json.loads(j.read())
     NCTId = root["FullStudy"]["Study"]["ProtocolSection"]["IdentificationModule"]["NCTId"]
     if NCTId != None:
          db.collection(u'trials').document(NCTId).set(root)

def firestoreSignIn(credentialsPath):
     cred = credentials.Certificate(credentialsPath)
     firebase_admin.initialize_app(cred)
     db = firestore.client()
     return db

if __name__ == "__main__":
    uploadStudiesFolder()
