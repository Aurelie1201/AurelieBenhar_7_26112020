const { mode } = require('crypto-js');
const models = require('../models');
const fileSystem = require('fs');
const jwt = require('jsonwebtoken');

exports.createMessage  = (req, res) =>{
    const message = JSON.parse(req.body.message)
    const title = message.title;
    const content = message.content;
    const userId = message.userId;
    
    const attachment = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
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

exports.getOneMessage = (req, res) =>{
    const idMessage = req.params.id;

    models.Message.findOne({where: {id: req.params.id}})
        .then(message =>{
            res.status(200).json(message);
        })
        .catch(error => res.status(500).json({error}));
};

exports.getAllMessages = (req, res) =>{
    models.Message.findAll({ order: [['id', 'ASC']]})
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(500).json({error}));
};

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