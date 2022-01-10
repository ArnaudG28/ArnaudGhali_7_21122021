// Version 2.0 creation du backend de l'application Groupomania

// logique métier des fonctions post

const db = require('../models');
// import du schema de données 
const Post = require('../models/post');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// import du package filesystem
const fs = require('fs');

// fonctions métiers pour les post
// on va exporter les différentes fonctions metiers 
// utilisation des methodes pour envoi et retour de la reponse au format json et de next pour renvoi à la prochaine fonction 

// création d'un post
exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
  const userId = decodedToken.userId;  
  
  db.User.findOne({ where: { id: userId } }) 
      .then(user => {
          db.Post.create({
              UserId: userId,
              content: req.body.content,
              image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
          })
          .then(post => res.status(201).json({ post }))
          .catch(error => res.status(400).json({ message: 'erreur création bdd' }))
      })
      .catch(error => res.status(500).json({ error:"pb base de données" }));        
}

// modification d'un post
exports.modifyPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
  const userId = decodedToken.userId;  
  
  db.User.findOne({ where: { id: userId } }) 
      .then(user => {
          db.Post.updateOne({
              UserId: userId,
              content: req.body.content,
              image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
          })
          .then(post => res.status(201).json({ post }))
          .catch(error => res.status(400).json({ message: 'erreur création bdd' }))
      })
      .catch(error => res.status(500).json({ error:"pb base de données" }));        
}

// suppression d'un post
exports.deletePost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })
      .then(post => {
          if(post.image) {
              const filename = post.image.split('/images/')[1]; // on récupère le nom du fichier à supprimer
              fs.unlink(`images/${filename}`, () => { // on utilise la fonction unlink du package fs pour supprimer le fichier 
                  post.destroy({ where: { id: req.params.id } })
                  .then(() => res.status(200).json({ message: 'Post supprimé'}))
                  .catch(error => res.status(400).json({ error: 'Pb suppression post' }));
              });
          }
          post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Post supprimé'}))
          .catch(error => res.status(400).json({ error: 'Pb suppression post' }));
      })
      .catch(error => res.status(500).json({ error:"pb base de données" }));
};


// renvoie un post
exports.getOnePost =  (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

// renvoie tous les post
exports.getAllPosts = (req, res, next) => {
  db.Post.findAll({
      include: {
          model: db.User,
          attributes: ["userID", "pseudo", "role", "picture"]
      },
      order: [
          ['dateCreation', 'DESC']
    ],
  })
      .then(posts => res.status(200).json(posts))
      .catch(error => res.status(500).json({ error }))
}

// renvoie tous les comments
exports.getAllComments = (req, res, next) => {
  db.Comment.findAll({
      where: { PostId: req.params.id},
      include: {
          model: db.User,
          attributes: ["userID", "pseudo", "role", "picture"]
      },
      order: [
          ['dateCreation', 'DESC']
    ],
  }) 
      .then(comments => res.status(200).json(comments))
      .catch(error => res.status(500).json({ error }))
}

