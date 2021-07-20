const { mode } = require('crypto-js');
const models = require('../models');
const fileSystem = require('fs');
const jwt = require('jsonwebtoken');

/**
 * Creat a message
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.createMessage  = (req, res) =>{
    let message, title, content, userId, attachment;

    if(req.file){
        message = JSON.parse(req.body.message)
        title = message.title;
        content = message.content;
        userId = message.userId;
        attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } else{
        console.log(req.body);
        title = req.body.title;
        content = req.body.content;
        userId = req.body.userId;
        attachment = null;
    }
    
    if(title == null || content == null){
        return res.status(400).json({ message: "Parameters missing"});
    }
    console.log(userId);
    models.Message.create({ title: title, content: content, likes: 0, UserId: userId, attachment: attachment})
        .then(newMessage =>{
            res.status(200).json(newMessage);
        })
        .catch(error => res.status(500).json({error}));
};

/**
 * Get one message
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.getOneMessage = (req, res) =>{
    const idMessage = req.params.id;

    models.Message.findOne({where: {id: req.params.id}})
        .then(message =>{
            res.status(200).json(message);
        })
        .catch(error => res.status(500).json({error}));
};

/**
 * Get all messages
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.getAllMessages = (req, res) =>{
    models.Message.findAll({ order: [['id', 'DESC']]})
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(500).json({error}));
};

/**
 * Delete a message
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.deleteMessage = (req, res) =>{
    const id = req.params.id;
    const token = req.headers.authorization;
    const decodedToken = jwt.decode(token.split(" ")[1]);
    const userId = decodedToken.userId;
    const admin = decodedToken.isAdmin;

    models.Message.findOne({where: {id: id}})
        .then(message =>{
            if(userId != message.userId && !admin){
                res.status(401).json({message: "Unauthorized to delete this message"});
            } else{
                const filename = message.attachment.split('/images/')[1];
                fileSystem.unlink(`images/${filename}`, () =>{
                    models.Comment.destroy({where: {messageId: id}})
                        .then(destroy =>{
                            message.destroy();
                            res.status(200).json({message: "Message deleted"});
                        })
                        .catch(error => res.status(500).json({error}));
                    })
            };
        })
        .catch(error => res.status(500).json({error}));
};