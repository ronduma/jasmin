const express = require('express');
const router = express.Router();
const helpers = require('../helpers');
const users = require('../data/users');
const path = require('path');
const xss = require('xss');


router.get('/', async(req, res) => {
    try{
        const therapistList = await users.getAllTherapists();
        console.log("list of therapists");
        return res.status(200).json(therapistList);
    }
    catch(e){
        console.log(e);
    }
});

module.exports = router;