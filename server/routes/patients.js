const express = require('express');
const router = express.Router();
// const helpers = require('../helpers');
const users = require('../data/users');
const path = require('path');
const xss = require('xss');


router.get('/all', async(req, res) => {
  try{
      const patientList = await users.getAllPatients();
      return res.status(200).json(patientList);
  }
  catch(e){
      console.log(e);
  }
});

router.get('/gettherapist:id', async(req, res) => {

  try{
    console.log(req.params.id)
      const Therapist = await users.getTherapistByPatientID(req.params.id);
      return res.status(200).json(Therapist);
  }
  catch(e){
      console.log(e);
  }
});



module.exports = router;