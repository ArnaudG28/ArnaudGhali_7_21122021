// Version 2.0 creation du backend de l'application Groupomania

// logique métier des fonctions utilisateur
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');

exports.getAllUsers = (req, res, next) => {
    db.User.findAll({
        order: [
            ['name', 'ASC']
      ],
    })
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json({ error }))
}

exports.getCurrentUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;

    db.User.findOne({ where: { id: userId } })
        .then(user => {
            res.status(200).json({
                UserId: user.userID,
                UserPseudo: user.pseudo,
                UserRole: user.role,
                UserImage: user.picture,
                email: user.email
            });
        })
        .catch(error => res.status(500).json({ error: 'erreur bdd' }))
}

exports.getOneUser = (req, res, next) => {
    db.User.findOne({ where: { id: req.params.id } })
        .then(user => {
            res.status(200).json({
                UserId: user.userID,
                UserPseudo: user.pseudo,
                UserRole: user.role,
                UserImage: user.picture,
                email: user.email
            });
        })
        .catch(error => res.status(500).json({ error: 'erreur bdd' }))
}

exports.modifyUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;

    db.User.findOne({ where: { id: userId } })
        .then(user => {
            if(user.image) {
                const filename = user.image.split('/images/')[1]; // on récupère le nom du fichier à supprimer
                console.log(user.image)
                fs.unlink(`images/${filename}`, () => { // on utilise la fonction unlink du package fs pour supprimer le fichier 
                    user.update({
                        image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
                    })
                    .then(() => res.status(200).json({ message: 'Utilisateur modifié'}))
                    .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour' }));
                });
            }
            user.update({
                image: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null )
            })
            .then(() => res.status(200).json({ message: 'Utilisateur modifié' }))
            .catch(error => res.status(400).json({ error: 'Impossible de mettre à jour' }));
        })
        .catch(error => res.status(404).json({ error: 'Utilisateur non trouvé' }))
  };


exports.deletePictureUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;

    db.User.findOne({ where: { id: userId } })
      .then(user => {
        const filename = user.image.split('/images/')[1]; // on récupère le nom du fichier à supprimer
        fs.unlink(`images/${filename}`, () => { // on utilise la fonction unlink du package fs pour supprimer le fichier 
            user.update({
                image:null
             })
            .then(() => res.status(200).json({ message: 'Photo supprimée'}))
            .catch(error => res.status(400).json({ error: 'Pb suppression photo' }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};

exports.deleteCurrentUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET);
    const userId = decodedToken.userId;

    db.User.findOne({ where: { id: userId } })
      .then(user => {
        if(user.image) {
            const filename = user.image.split('/images/')[1]; // on récupère le nom du fichier à supprimer
            console.log(user.image)
            fs.unlink(`images/${filename}`, () => { // on utilise la fonction unlink du package fs pour supprimer le fichier 
                user.destroy({ where: { id: userId } })
                .then(() => res.status(200).json({ message: 'Compte supprimé'}))
                .catch(error => res.status(400).json({ error: 'Pb suppression compte' }));
            });
        }
       user.destroy({ where: { id: userId } })
        .then(() => res.status(200).json({ message: 'Compte supprimé'}))
        .catch(error => res.status(400).json({ error: 'Pb suppression compte' }));
      })
      .catch(error => res.status(500).json({ error:"pb base de données" }));
};