const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
    sympton = request.parameter(symptom)

    response.send("Hello from Firebase!");
 });

 exports.query = functions.https.onRequest((req, res) => {
    const admin = require('firebase-admin');
    const functions = require('firebase-functions');
  
    admin.initializeApp(functions.config().firebase);
    let db = admin.firestore()
    
    var database = db.collection("All Studies")
    var query = database.where("overall_status", "==", "Completed");
    
    
    res.status(200).send(query);
  });
