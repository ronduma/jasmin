const express = require('express');
const router = express.Router();
const helpers = require('../helpers');
const users = require('../data/users');
const path = require('path');
const xss = require('xss');


router.get('/', async(req, res) => {
    try{
        const therapistList = await users.getAllTherapists();
        // const therapistID = req.params.therapistID;
        console.log("list of therapists");

        // Send a success response with the updated user data
        // return res.status(200).json({ success: true, message: 'User matched successfully', user: currentUser });
        return res.status(200).json(therapistList)
    }
    catch(e){
        console.log(e);
    }
});

router.get('/:selectedYourself', async(req, res) => {
    console.log('bruh');
    console.log(req.params.selectedYourself);
});

module.exports = router;