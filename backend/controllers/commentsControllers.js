const models = require('../models');

exports.createcomment  = (req, res) =>{
    const content = req.body.content;
    const userId = req.body.userId;
    const idMessage = req.body.idMessage;

    if(content == null){
        return res.status(400).json({ message: "Parameters missing"});
    }
    models.Comment.create({ content: content, userId: userId, MessageId: idMessage})
        .then(newComment =>{
            res.status(200).json(newComment);
        })
        .catch(error => res.status(500).json({error}));
};