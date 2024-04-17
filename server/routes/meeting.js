const express = require('express');
const router = express.Router();
const users = require('../data/users');
const meetings = require('../data/meetings')
const path = require('path');

router.get('/therapist/:id', async (req, res) => {

    const therapistId = req.params.id;
    try {
      const therapist = await meetings.getMeetingsByTimeTherapist(therapistId)
      console.log("GET: therapist id")
      console.log(therapist)
      return res.status(200).json(therapist);
      
    } catch (error) {
      return res.status(404).json(error);
      
    }
    
});

router.get('/patient/:id', async (req, res) => {

  const patientId = req.params.id;
  try {
    const patient = await meetings.getMeetingByTimePatients(patientId)
    console.log("GET: patient id")
    console.log(patient)
    return res.status(200).json(patient);
    
  } catch (error) {
    return res.status(404).json(error);
    
  }
  
});



router.post('/', async (req, res) => {

    try {
        // Extract data from the request body
        const { currentUserID, therapistID, time } = req.body;
        console.log("Matching: Req Body")
        console.log(req.body)
        // Call the match function
        const currentUser = await meetings.createMeeting(currentUserID, therapistID, time);
        return res.status(200).json({ success: true, message: 'User created meeting successfully', user: currentUser });
      } catch (error) {
        // Handle errors
        console.error('Error matching users:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

});

router.delete('/:id', async (req, res) => {

  try {
      // Extract data from the request body
      const { currentUserID, therapistID, time } = req.body;
      console.log("Matching: Req Body")
      console.log(req.body)
      // Call the match function
      const currentUser = await meetings.deleteMeeting(currentUserID, therapistID, time);
      return res.status(200).json({ success: true, message: 'User deleted meeting successfully', user: currentUser });
    } catch (error) {
      // Handle errors
      console.error('Error deleting meeting:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

});

module.exports = router;