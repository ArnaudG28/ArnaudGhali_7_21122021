// Version 2.0 creation du backend de l'application Groupomania

// enregistrement des differentes routes en fonction des logiques métiers (création, suppresion, modification, ...) avec protection auth
// dans le router express avant enregistrament dans l'application

// import application Epress pour créer un router
const express = require('express');
// import du middelware de protection des routes authentification
const auth = require ('../middleware/auth');
// import du controlleur métier des comment
const commentCtrl = require('../controllers/comment'); // pour importer le controleur

//pour enregistrer des commentaires dans la BDD
router.post('/',auth, commentCtrl.createComment);

//pour supprimer un commentaire 
router.delete('/:id', auth, commentCtrl.deleteComment);


// export du router
module.exports = router;

