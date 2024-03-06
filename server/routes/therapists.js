const express = require('express');
const router = express.Router();
const users = require('../data/users');

router.get('/', async(req, res) => {
    const therapistList = await users.getAllTherapists();
    console.log("list of therapists: ", therapistList);
    return res.status(200).json(therapistList);
});

module.exports = router;