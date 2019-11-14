/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */



exports.query = (req, res) => {
    const admin = require('firebase-admin');
    const functions = require('firebase-functions');
  
    admin.initializeApp(functions.config().firebase);
    let db = admin.firestore()
    
    let message = req.query.message || req.body.message || 'Hello World!';
    var database = db.collection("All Studies")
    var query = database.where("overall_status", "==", "Completed");
    
    
    res.status(200).send(query);
  };