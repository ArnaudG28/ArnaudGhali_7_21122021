// Version 2.0 creation du backend de l'application Groupomania

// Application framework Express

// import application Epress 
const express = require('express');

// import des routers
const userRoutes = require('./routes/user'); // pour importer notre router user
const postRoutes = require('./routes/post'); // pour importer notre router user
const commentRoutes = require('./routes/comment'); // pour importer notre router user
const router = express.Router(); // pour créer un routeur Express

const db = require("./models");
db.sequelize.sync()

// creation du path serveur
const path = require('path');

// recupere toutes les requêtes application/json (pas besoin d'utiliser bodyparse pour json car inclut dans express) 
// et met à disposition leur body sur l'objet req
const bodyParser = require('body-parser'); // pour importer le package body parser
app.use(cors());
app.use(bodyParser.json()); // pour transformer le corps de la requête en objet JS

// traitement de la route vers le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));


// enregistrement des routers
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/comment', commentRoutes); // pour enregistrer le routeur pour toutes les demandes effectuées vers /api/sauces

 // export de l'application
 module.exports = app;
