const functions = require('firebase-functions');

// Import Google Translation Library
const {Translate} = require('@google-cloud/translate')
const projID = 'this-messaging-service';

// Instantiates a client
const translateNew = new Translate({projID});

// List of output languages.
const languages = ['es', 'fr','de', "en"];

// Translates language
exports.translate = functions.https.onCall(async (data, res) =>  {
    
    // print original text
    let text = data.originalText;    

    let fromLang = data.fromLanguage.toLowerCase();

    let translations = {};

    // loops and prints out translated language
    for(const language of languages) {
        if (language === fromLang) continue; 
        let [translation] = await translateNew.translate(text, {from: fromLang, to: language });
        translations[language] = translation;
    }
    translations[fromLang] = text;
    return translations;
});