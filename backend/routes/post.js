// Version 2.0 creation du backend de l'application Groupomania

// logique des routes post

// import application Epress pour créer un router
const express = require('express');
// import du controlleur métier des sauces
const postCtrl = require('../controllers/post');
// import du middelware de protection des routes authentification
const auth = require ('../middleware/auth');
// import du middelware de gestion de fichier
const multer = require ('../middleware/multer-config');

// création d'un routeur Express 
const router = express.Router();


// enregistrement des differentes routes en fonction des logiques métiers (création, suppresion, modification, ...) avec protection auth
// dans le router express avant enregistrament dans l'application


//pour enregistrer des posts dans la BDD
router.post('/', auth, multer, postCtrl.createPost);
// route pour la modification d'un post
router.put('/:id', auth, multer, postCtrl.modifyPost);
//pour afficher tous les posts
router.get('/', postCtrl.getAllPosts);
//pour afficher tous les comments
router.get('/:id/comments', postCtrl.getAllComments);
//pour afficher tous les posts d'un user
router.get('/users/:id', auth, postCtrl.getAllPostsByUser);
//pour supprimer un post 
router.delete('/:id', auth, postCtrl.deletePost);



// route pour la creation d'une sauce incluant un fichier image
router.post('/', auth, multer, postCtrl.createPost);


// export du router
module.exports = router;








