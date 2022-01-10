// Version 2.0 creation du backend de l'application Groupomania

// logique des routes utilisateur
const express = require('express'); // pour importer express
const router = express.Router(); // pour créér notre router avec la fonction router de express
const multer = require('../middleware/multer-config'); // pour importer le middleware multer
const auth = require('../middleware/auth'); // pour importer le middleware auth
const userCtrl = require('../controllers/user'); // pour importer les controleurs
const authCtrl = require('../controllers/auth'); // pour importer les controleurs


//pour créer un nouveau user 
router.post('/auth/signup', authCtrl.signup);
//pour connecter le user 
router.post('/auth/login', authCtrl.login);

//pour récupérer tous les users
router.get('/users', auth, userCtrl.getAllUsers);
//pour récupérer un seul user
router.get('/users/user/:id', auth, userCtrl.getOneUser);
//pour récupérer le user qui est connecté
router.get('/users/monprofil', auth, userCtrl.getCurrentUser);

//pour mettre à jour la photo du user connecté
router.put('/users/monprofil', auth, multer, userCtrl.modifyUser);

//pour supprimer la photo de profil du user
router.put('/users/monprofil/mypicture', auth, multer, userCtrl.deletePictureUser);


//pour supprimer le compte du user connecté
router.delete('/users/monprofil', auth, userCtrl.deleteCurrentUser);


module.exports = router; // pour exporter le router vers app.js