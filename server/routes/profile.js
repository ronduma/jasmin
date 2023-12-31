const express = require('express');
const router = express.Router();
const helpers = require('../helpers');
const users = require('../data/users');
const path = require('path');
const xss = require('xss');


router.get('/:id', async(req,res) => {
    const userObject = await users.getUserById(req.params.id);
    console.log(userObject)
    return res.status(200).json(userObject);
})

router.put('/', async(req,res) => {
    try {
        let user = await users.updateUser(req.body);
        return res.status(200).json(user);
    } catch (e) {
        console.log(e)
    return res.status(400).json(e);
    }
});

module.exports = router;