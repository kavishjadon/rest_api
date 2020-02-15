const express = require('express');
const userValidation = require('../validation/user');
const isLoggedIn = require('../middleware/isLoggedIn');
const mongo = require('../config/mongo');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
    res.json({result: "This is a secure route.."})
});

router.post('/signup', (req, res) => {
    const {error, value} = userValidation.validate(req.body);
    if(error)
        return res.json({error: error.details[0].message});
    
    const users = mongo.db('api').collection('users');

    users.findOne({email: value.email}, (err, data) => {
        if(data)
            return res.json({error: "User already exists!"});
        users.insertOne(value, (err, data) => {
            if(err)
                res.status(400).json({error: "Something went wrong"});
            else {
                const token = jwt.sign({_id: data._id}, process.env.JWT_KEY);
                res.json({authorization: token});
            }
        }); 
    });
});

module.exports = router;