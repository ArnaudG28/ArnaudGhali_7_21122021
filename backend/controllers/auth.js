// Version 2.0 creation du backend de l'application Groupomania

// imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models');

exports.signup = (req, res, next) => {
    const regexPassword = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ // on utilise un regex pour le mot de passe
     if (!regexPassword.test(req.body.password)){ 
        res.status(406).json({ message: 'Mot de passe incorrect' })  
        return false
     }
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        db.User.create ({
            email: req.body.email,
            name: req.body.name,
            job: req.body.job,
            password: hash
        })
        .then(user => {
            res.status(201).json({
                userId: user.id,
                role: user.role,
                userName: user.name,
                token: jwt.sign(
                    { 
                        userId: user.id,
                        role: user.role,
                        userName: user.name
                    },
                    process.env.JWT_RAND_SECRET,
                    { expiresIn: '24h' }
                )
            })
       })
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error })) 
};

exports.login = (req, res, next) => {
    db.User.findOne({where: { email: req.body.email } }) // on vérifie que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données 
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) // on utilise la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        role: user.role,
                        token: jwt.sign( // on utilise la fonction sign dejsonwebtoken pour encoder un nouveau token
                            {
                                userId: user.id,
                                role: user.role,
                                userName: user.name
                            },
                            process.env.JWT_RAND_SECRET, // on utilise une chaîne secrète de développement temporaire
                            {expiresIn: '24h'} // pour définir la durée de validité du token
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};