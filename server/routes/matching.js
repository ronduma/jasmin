const express = require('express');
const router = express.Router();
const users = require('../data/users');
const path = require('path');

router.get('/', async (req, res) => {
  console.log(req.session.user)
  return res.status(200).json(req.session.user);
});


router.post('/', async (req, res) => {

    try {
        // Extract data from the request body
        const { currentUserID, therapistID } = req.body;
        // console.log("Matching: Req Body")
        // console.log(req.body)
        // Call the match function
        const currentUser = await users.match(currentUserID, therapistID);
        return res.status(200).json({ success: true, message: 'User matched/unmatched successfully', user: currentUser });
      } catch (error) {
        // Handle errors
        console.error('Error matching users:', error);
        return res.status(500).json({ success: false, message: error });
      }

});

module.exports = router;