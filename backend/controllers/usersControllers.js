const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CryptoJs = require('crypto-js');
const key = CryptoJs.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJs.enc.Hex.parse(process.env.CRYPTO_IV);

const models = require('../models');

exports.signup = (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;

    console.log("email : " + email);
    console.log("password : " + password);
    if(email == null || password == null){
        return res.status(400).json({message: 'missing parameters'});
    }
    if (!testMail(req.body.email)){
        return res.status(400).json({message: "email address invalid"});
    }
    if (!testPassword(req.body.password)){
        return res.status(400).json({message: "password invalid"})
    }

    models.User.findOne({ attributes: ['mail'], where: { mail: req.body.email } })
        .then(userFound =>{
            if (!userFound){
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const cryptMail = CryptoJs.AES.encrypt(req.body.email, key, {iv: iv}).toString();
                        const user = models.User.create({mail: cryptMail, password: hash, isAdmin: 0})
                                        .then(() => res.status(201).json({message: 'user created'}))
                                        .catch(error => {res.status(500).json({message: 'cannot add user'})});
                    })
                    .catch(error => res.status(500).json({error}));
            } else{
                return res.status(400).json({message: 'user already exist'});
            }
        })
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res) =>{

};

/**
 * Vérification d'un mail d'une apparence valide
 * @param {String} mail 
 * @returns {Boolean}
 */
 const testMail = (mail) =>{
    let regMail = new RegExp ("^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}");
    console.log("coucou mail");
    return regMail.test(mail);
};

/**
 * Vérification d'un mot de passe contenant au moins 8 caractères
 * et contenant des chiffres, des lettres et seulement ._- comme caractères spéciaux
 * @param {String} password 
 * @returns {Boolean}
 */
const testPassword = (password) =>{
    let regPassword = new RegExp ("^[0-9a-zA-Z._-]{8,}");
    console.log("coucou password");
    return regPassword.test(password);
};