const express = require('express')
const fetch = require('node-fetch')
const path = require('path');
const admin = require('firebase-admin');
const app = express()

app.use(express.static(path.join(__dirname, 'client/build')));

let serviceAccount = require('./client/src/firebaseKey.json');
admin.initializeApp({
 credential: admin.credential.cert(serviceAccount)
 });
let db = admin.firestore();

let docRef = db.collection('Pokemon')


/* Default endpoint */
app.get('/', (req, res) => {
  res.send('')
})

/* Retrieve all pokemon endpoint. This was reconfigured to only get Pokemon new to gen 3 */
app.get('/pokemon', async (req, res) => {
  try{
      let pokedex = []
      for(let i = 252; i < 387; i++){
          let pokemon = await docRef.doc(i.toString()).get()
          pokedex.push(pokemon.data())
      }
      res.send(pokedex)
  }  catch(err){
      console.log(err)
      res.status(500).send('Error fetching Pokedex data')
  }
})

/* Endpoint to retrieve a specific Pokemon */
app.get('/pokemon/:id', async (req, res) => {
    try {
        let pokemon = await docRef.doc(req.params.id).get();
        res.send(pokemon.data());
    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting Pokemon data');
    }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = app;