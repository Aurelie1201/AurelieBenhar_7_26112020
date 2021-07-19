const models = require('../models');
const jwt = require('jsonwebtoken');

exports.createcomment  = (req, res) =>{
    // const comment = req.body.comment;
    const content = req.body.content;
    const userId = req.body.userId;
    const messageId = req.body.messageId;
    console.log("coucou "+content);
    if(content == null){
        return res.status(400).json({ message: "Parameters missing"});
    }
    models.Comment.create({ content: content, userId: userId, MessageId: messageId})
        .then(newComment =>{
            res.status(200).json({message: "comment created"});
        })
        .catch(error => res.status(500).json({error}));
};

exports.getAllComments = (req, res) =>{
    const messageId = req.params.id;
    
    models.Comment.findAndCountAll({where : {'messageId': messageId}})
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({error}));
};

exports.getOneComments = (req, res) =>{
    const commentId = req.params.commentId;

    models.Comment.findOne({where: {id: commentId}})
        .then(message =>{
            res.status(200).json(message);
        })
        .catch(error => res.status(500).json({error}));
};

exports.deleteComment = (req, res) =>{
    const id = req.params.id;
    const token = req.headers.authorization;
    const decodedToken = jwt.decode(token.split(" ")[1]);
    const userId = decodedToken.userId;
    const admin = decodedToken.isAdmin;

    models.Comment.findOne({where: {id: id}})
        .then(comment =>{
            if(userId != comment.userId && !admin){
                res.status(401).json({message: "Unauthorized to delete this message"});
            } else{
                comment.destroy();
                res.status(200).json({message: "Comment deleted"});
            };
        })
        .catch(error => res.status(500).json({error}));
};