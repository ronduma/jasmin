const express = require('express');
const router = express.Router();
// const helpers = require('../helpers');
const users = require('../data/users');
const path = require('path');
const xss = require('xss');
router.get('/', async(req, res) => {
    try{
        const therapistList = await users.getFilteredTherapists(req.query);
        return res.status(200).json(therapistList)
    }
    catch(e){
        console.log(e);
    }
});

router.get("/:name", async(req, res) => {
    try{
        const therapist = await users.getTherapistByName(req.params.name);
        return res.status(200).json(therapist);
    }
    catch(e){
        console.log(e);
    }
})


module.exports = router;