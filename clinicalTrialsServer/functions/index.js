const functions = require("firebase-functions");
const cors = require("cors")({origin: "*"});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  const sympton = request.parameter(symptom)
  response.send("Hello from Firebase!");
});

exports.query = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
  const admin = require("firebase-admin");
  const functions = require("firebase-functions");
  const arrayOfResults = new Array();
  //const firebaseID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  if (!admin.apps.length) {admin.initializeApp(functions.config().firebase)}
  let db = admin.firestore()
  let result
  var database = db.collection("All Studies")
  var querySearchTermOne = "No Input"
  if(req.query.searchTermOne){
  querySearchTermOne = req.query.searchTermOne
  }
  console.log(querySearchTermOne)
  var query = database.where("overall_status", "==", querySearchTermOne).get()
      .then(snapshot => {
          if (snapshot.empty) {
              console.log("No matching documents");
              arrayOfResults.push("No Results Found")
              res.set("Access-Control-Allow-Origin", "*")
              res.set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
              res.set("Access-Control-Allow-Headers", "Origin, Content-Type")
              res.status(404).send(arrayOfResults);
          return
          }
          snapshot.forEach(doc => {
              arrayOfResults.push(doc.data())
          })
          //console.log(arrayOfResults)
          res.set("Access-Control-Allow-Origin", "*")
          res.set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
          res.set("Access-Control-Allow-Headers", "Origin, Content-Type")
          res.status(200).send(arrayOfResults);
          return
      })
      .catch(err => {
          console.log("Error getting documents", err);
      });
  })
  
});
