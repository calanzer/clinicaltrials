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
    let result
    var database = db.collection("All Studies")
    var query = database.where("overall_status", "==", "Completed").get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents');
                return;
            }
            snapshot.forEach(doc => {
                result = doc.id
                details = doc.data().brief_title

            })
            console.log(details)
            res.status(200).send(details);
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    
    
  });
