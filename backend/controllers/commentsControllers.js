const models = require('../models');
const jwt = require('jsonwebtoken');

/**
 * Creat a comment
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.createcomment  = (req, res) =>{
    const content = req.body.content;
    const userId = req.body.userId;
    const messageId = req.body.messageId;
    
    if(content == null){
        return res.status(400).json({ message: "Parameters missing"});
    }
    models.Comment.create({ content: content, userId: userId, MessageId: messageId})
        .then(newComment =>{
            res.status(200).json({message: "comment created"});
        })
        .catch(error => res.status(500).json({error}));
};

/**
 * Get all comments from a message
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.getAllComments = (req, res) =>{
    const messageId = req.params.id;
    
    models.Comment.findAndCountAll({where : {'messageId': messageId}})
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({error}));
};

/**
 * Get one comment
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
exports.getOneComments = (req, res) =>{
    const commentId = req.params.commentId;

    models.Comment.findOne({where: {id: commentId}})
        .then(message =>{
            res.status(200).json(message);
        })
        .catch(error => res.status(500).json({error}));
};

/**
 * Delete a comment
 * @param {Object} req 
 * @param {Object} res 
 * @returns 
 */
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