const functions = require('firebase-functions');

// Import Google Translation Library
const {Translate} = require('@google-cloud/translate')
const projID = 'this-messaging-service';

// Instantiates a client
const translateNew = new Translate({projID});

// List of output languages.
const languages = ['es', 'fr','de'];

// Translates language
exports.translate = functions.https.onRequest(async (req, res) =>  {
    
    // print original text
    let text = req.body.originalText;    
        
    let translations = {};

    // loops and prints out translated language
   for(const language of languages) {
        let [translation] = await translateNew.translate(text, language);
        translations[language] = translation;
    }
    res.json(translations);
});