const express = require('express');
const router = express.Router();
const users = require('../data/users');
const meetings = require('../data/meetings')
const path = require('path');

router.get('/therapist/:id', async (req, res) => {
    const { currentUserID, therapistID, time } = req.body;
    const therapist = await meetings.getMeetingsByTimeTherapist(id)
    console.log(req.session.user)
    return res.status(200).json(req.session.user);
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

module.exports = router;