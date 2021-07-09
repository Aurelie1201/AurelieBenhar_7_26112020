const models = require('../models');

exports.createcomment  = (req, res) =>{
    const content = req.body.content;
    const userId = req.body.userId;
    const messageId = req.body.messageId;

    if(content == null){
        return res.status(400).json({ message: "Parameters missing"});
    }
    models.Comment.create({ content: content, userId: userId, MessageId: messageId})
        .then(newComment =>{
            res.status(200).json(newComment);
        })
        .catch(error => res.status(500).json({error}));
};

exports.getAllComments = (req, res) =>{
    const messageId = req.params.id;
    
    models.Comment.findAndCountAll({where : {'messageId': messageId}})
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({error}));
};

exports.deleteComment = (req, res) =>{
    const id = req.params.id;
    const userId = req.body.userId;

    models.Comment.findOne({where: {id: id}})
        .then(comment =>{
            if(userId != comment.userId){
                res.status(401).json({message: "Unauthorized to delete this message"});
            } else{
                comment.destroy();
                res.status(200).json({message: "Comment deleted"});
            };
        })
        .catch(error => res.status(500).json({error}));
};