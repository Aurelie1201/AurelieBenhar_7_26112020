const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fileSystem = require('fs');

const models = require('../models');

/**
 * Create a user
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.signup = (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;

    if(email == null || password == null || lastName == null || firstName == null){
        return res.status(400).json({message: 'missing parameters'});
    } else if (!testMail(email)){
        return res.status(400).json({message: "email address invalid"});
    }else if (!testPassword(password)){
        return res.status(400).json({message: "password invalid"})
    } else if(!testMot(lastName) || !testMot(firstName)){
        return res.status(400).json({message: "word invalid"})
    } else {
        models.User.findOne({where: { email: email } })
        .then( userFound =>{
            if (!userFound){
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const user = models.User.create({
                                        email: email, 
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

/**
 * Send a token to user who is logged in
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.login = (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;

    if(email == null || password == null){
        return res.status(400).json({message: 'missing parameters'});
    }

    models.User.findOne({ where: { email: email}})
        .then( userFound =>{
            if (userFound){
                bcrypt.compare(password, userFound.password)
                .then(valid =>{
                    if (!valid){
                        return res.status(401).json({message: 'wrong password'});
                    }
                    res.status(200).json({
                        userId: userFound.id,
                        isAdmin: userFound.isAdmin,
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

/**
 * Get a user
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.getUser = (req, res) =>{
    const userId = req.params.id;
    
    models.User.findOne({ where: { id: userId}})
        .then( user =>{
            if(user){
                models.Message.findAndCountAll({ where: { userId: user.id}})
                    .then(messages =>{
                        res.status(200).json({ "firstName": user.firstName, "lastName": user.lastName, "email": user.email, "messagesCount": messages.count});
                        
                    })
                    .catch(error => res.status(500).json({error}));
            } else{
                res.status(404).json({message: 'user not find'});
            };
        })
        .catch( error => res.status(500).json({error}));
};

/**
 * Delete a user
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.deleteUser = async (req, res) =>{
    const userId = req.params.id;
    const token = req.headers.authorization;
    const decodedToken = jwt.decode(token.split(" ")[1]);
    const userIdToken = decodedToken.userId;
    const admin = decodedToken.isAdmin;

    if(!admin && userId !=userIdToken){
        res.status(401).json({message: "Unauthorized to delete this user"});
    } else{
        await models.Comment.destroy({ where: {userId: userId}});

        const messages = await models.Message.findAll({ where: {userId: userId}});
        let filename;
        for(let message of messages) {
            if(message.attachment == null){
                await models.Comment.destroy({ where: { messageId: message.id}});
                await models.Message.destroy({ where: { id: message.id }});
            } else{
                filename = message.attachment.split('/images/')[1];
                fileSystem.unlink(`images/${filename}`, async () =>{
                    await models.Comment.destroy({ where: { messageId: message.id}});
                    await models.Message.destroy({ where: { id: message.id }});
                })
            };
        };
            
    };
    
    models.User.destroy({where: {id: userId}})
    .then(destroy => res.status(200).json({message: "User deleted"}))
    .catch( error => res.status(500).json({error}))
};

/**
 * Update a user's password
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.updatePassword = (req, res) =>{
    const userId = req.params.id;
    const newPassword = req.body.newPassword;
     console.log(newPassword)
    if(!testPassword(newPassword)){
        res.status(400).json({message: "password invalid"})
    }else{
        bcrypt.hash(newPassword, 10)
            .then(hash => {
                models.User.update({ password: hash}, { where: { id: userId}})
                    .then(response => res.status(200).json({message: 'password changed'}))
                    .catch(error => res.status(500).json({error}));
                })      
            .catch(error => res.status(500).json({error}));
    }
};

/**
 * Check an email with a valid appearance
 * @param {String} mail 
 * @returns {Boolean}
 */
 const testMail = (mail) =>{
    let regMail = new RegExp ("^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}");
    console.log("coucou mail");
    return regMail.test(mail);
};

/**
 * Checking a password containing at least 8 characters
 * and containing numbers, letters and only ._- as special characters
 * @param {String} password 
 * @returns {Boolean}
 */
const testPassword = (password) =>{
    let regPassword = new RegExp ("^[0-9a-zA-Z._-]{8,}");
    console.log(regPassword.test(password));
    return regPassword.test(password);
};

/**
 * Checking a word without special characters
 * @param {String} mot 
 * @returns {Boolean}
 */
 const testMot = (mot) =>{
    let regMot = new RegExp ("^[a-zA-ZéèàçîïÉÈÎÏ '-]+$");

    return regMot.test(mot);
};