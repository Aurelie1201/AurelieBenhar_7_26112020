const { mode } = require('crypto-js');
const models = require('../models');

exports.createMessage  = (req, res) =>{
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.body.userId;

    if(title == null || content == null){
        return res.status(400).json({ message: "Parameters missing"});
    }
    console.log(userId);
    models.Message.create({ title: title, content: content, likes: 0, userId: userId})
        .then(newMessage =>{
            res.status(200).json(newMessage);
        })
        .catch(error => res.status(500).json({error}));
};