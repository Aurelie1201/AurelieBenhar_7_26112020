const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CryptoJs = require('crypto-js');
const fileSystem = require('fs');
const key = CryptoJs.enc.Hex.parse(process.env.CRYPTO_KEY);
const iv = CryptoJs.enc.Hex.parse(process.env.CRYPTO_IV);

const models = require('../models');

exports.signup = (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const cryptMail = CryptoJs.AES.encrypt(req.body.email, key, {iv: iv}).toString();

    console.log("email : " + email);
    console.log("password : " + password);
    if(email == null || password == null || lastName == null || firstName == null){
        return res.status(400).json({message: 'missing parameters'});
    } else if (!testMail(email)){
        return res.status(400).json({message: "email address invalid"});
    }else if (!testPassword(password)){
        return res.status(400).json({message: "password invalid"})
    } else if(!testMot(lastName) || !testMot(firstName)){
        return res.status(400).json({message: "word invalid"})
    } else {
        models.User.findOne({where: { email: cryptMail } })
        .then( userFound =>{
            if (!userFound){
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const user = models.User.create({
                                        email: cryptMail, 
                                        password: hash, 
                                        lastName: lastName, 
                                        firstName: firstName, 
                                        isAdmin: 0
                                        })
                                        .then(() => res.status(201).json({message: 'user created'}))
                                        .catch(error => {res.status(500).json({message: 'cannot add user'})});
                    })
                    .catch(error => res.status(500).json({error}));
            } else{
                return res.status(400).json({message: 'user already exists'});
            }
        })
        .catch(error => res.status(500).json({error}));
    };
};

exports.login = (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const cryptMail = CryptoJs.AES.encrypt(req.body.email, key, {iv: iv}).toString();

    if(email == null || password == null){
        return res.status(400).json({message: 'missing parameters'});
    }

    models.User.findOne({ where: { email: cryptMail}})
        .then( userFound =>{
            if (userFound){
                bcrypt.compare(password, userFound.password)
                .then(valid =>{
                    if (!valid){
                        return res.status(401).json({message: 'wrong password'});
                    }
                    res.status(200).json({
                        userId: userFound.id,
                        token: jwt.sign(
                            {userId: userFound.id},
                            process.env.TOKEN_KEY,
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}))
            } else{
                return res.status(400).json({message: 'user do not exists'});
            }
        })
        .catch( error => res.status(500).json({error}));
};

exports.getUser = (req, res) =>{
    const userId = req.params.id;
    
    models.User.findOne({ where: { id: userId}})
        .then( user =>{
            if(user){
                // const decrypt = CryptoJs.AES.decrypt(user.email, key);
                // const decryptMail = JSON.parse(decrypt.toString(CryptoJS.enc.Hex));
                // console.log(decryptMail);
                models.Message.findAndCountAll({ where: { userId: user.id}})
                    .then(messages =>{
                        res.status(200).json({ "firstName": user.firstName, "lastName": user.lastName, "messagesCount": messages.count});
                        
                    })
                    .catch(error => res.status(500).json({error}));
            } else{
                res.status(404).json({message: 'user not find'});
            };
        })
        .catch( error => res.status(500).json({error}));
};

exports.deleteUser = (req, res) =>{
    const userId = req.params.id;
    const token = req.headers.authorization;
    const decodedToken = jwt.decode(token.split(" ")[1]);
    const userIdToken = decodedToken.userId;
    const admin = decodedToken.isAdmin;

    if(!admin && userId !=userIdToken){
        res.status(401).json({message: "Unauthorized to delete this user"});
    } else{
        models.User.findOne({where: {id: userId}})
            .then(user =>{
                    models.Message.findAll({ where: {userId: userId}})
                        .then(messages =>{
                            for (let message of messages){
                                console.log('1');
                                let filename = message.attachment.split('/images/')[1];
                                fileSystem.unlink(`images/${filename}`, () =>{
                                    models.Comment.destroy({where: {messageId: message.id}});
                                })
                            }
                            models.Message.destroy({where: {userId: userId}})
                                .then(destroy =>{
                                    user.destroy();
                                    res.status(200).json({message: "User deleted"});
                                })
                                .catch(error => res.status(500).json({error}));
                        })
                        .catch(error => res.status(500).json({error}));
            })
            .catch(error => res.status(500).json({error}));
        };
}

// models.Message.destroy({where: {userId: userId}})
//                     .then(destroy =>{
//                         user.destroy();
//                         res.status(200).json({message: "User deleted"});
//                     })
//                     .catch(error => res.status(500).json({error}));

// exports.updatePassword = (req, res) =>{
//     const userId = req.body.userId;
//     const newPassword = req.body.password;

//     models.User.findOne({ attributes: ['id', 'password'], where: { id: userId}})
//         .then( user =>{
//             user.update
//         })
//         .catch( error => res.status(500).json({error}));
// };

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
    console.log(regPassword.test(password));
    return regPassword.test(password);
};

/**
 * Vérification d'un mot sans caractères spéciaux
 * @param {String} mot 
 * @returns {Boolean}
 */
 const testMot = (mot) =>{
    let regMot = new RegExp ("^[a-zA-ZéèàçîïÉÈÎÏ '-]+$");

    return regMot.test(mot);
};