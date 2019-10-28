const functions = require('firebase-functions');

// Import Google Translation Library
const {Translate} = require('@google-cloud/translate')
const projID = 'this-messaging-service';


// Instantiates a client
const translateNew = new Translate({projID});

// List of output languages.
const LANGUAGE = ['es', 'fr','de'];
var result = [];

// Translates language
exports.translate = functions.https.onRequest((req, res) =>  {
    var text = req.body.originalText;    
    console.log(`Original Text: ${text}`);
    
    for (let i = 0; i < LANGUAGE.length; i++){
        const language = LANGUAGE[i];
        translateNew.translate(text, language)
        .then(results => {
            const translation = results[0];
            console.log(`Translation: ${translation}`);

        response = {
            translated_Message: translation.replace(/(\r\n|\n|\r)/gm, " "),
        }  
        // Send Response
        res.status(200).end(JSON.stringify(response));
        })
        
        .catch(err => {
            console.error('Error', err);
        });
    }
});