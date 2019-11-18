const functions = require('firebase-functions');
const cors = require('cors')({ origin: true})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
    sympton = request.parameter(symptom)

    response.send("Hello from Firebase!");
 });

 exports.query = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
    const admin = require('firebase-admin');
    const functions = require('firebase-functions');
    const arrayOfResults = new Array()
    //const firebaseID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    if (!firebase.apps.length) {admin.initializeApp(functions.config().firebase,firebaseID)};
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
                arrayOfResults.push(doc.data().brief_title)
              
            })
            //console.log(arrayOfResults)
            res.set('Access-Control-Allow-Origin', "*")
            res.set('Access-Control-Allow-Methods', 'GET, POST')
            res.status(200).send(arrayOfResults);
            return
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    })
    
  });
