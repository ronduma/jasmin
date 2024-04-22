const express = require('express');
const router = express.Router();
// const helpers = require('../helpers');
const users = require('../data/users');
const path = require('path');
const xss = require('xss');
router.get('/', async(req, res) => {
  try{
    const therapistList = await users.getFilteredTherapists(req.query);
    // const therapistID = req.params.therapistID;
    // Send a success response with the updated user data
    // return res.status(200).json({ success: true, message: 'User matched successfully', user: currentUser });
    return res.status(200).json(therapistList);
  }
  catch(e){
    console.log(e);
  }
});

router.get('/all', async(req, res) => {
  try{
      const therapistList = await users.getAllTherapists();
      // const therapistID = req.params.therapistID;
      // Send a success response with the updated user data
      // return res.status(200).json({ success: true, message: 'User matched successfully', user: currentUser });
      // console.log(therapistList);
      return res.status(200).json(therapistList);
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