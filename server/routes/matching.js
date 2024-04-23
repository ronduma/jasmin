const express = require('express');
const router = express.Router();
const users = require('../data/users');
const path = require('path');
const chats = require('../data/chats')

router.get('/', async (req, res) => {
  console.log(req.session.user)
  return res.status(200).json(req.session.user);
});


router.post('/', async (req, res) => {

  try {
    // Extract data from the request body
    const { currentUserID, therapistID } = req.body;
    console.log("Matching: Req Body")
    console.log(req.body)
    // Call the match function
    const currentUser = await users.match(currentUserID, therapistID);

    // Check if chat exists between the two users
    //DYLAN
    const existingChat = await chats.getChatByPatientandTherapistID(currentUserID, therapistID);
    
    if (existingChat===false) {
      // If chat does not exist, create a new chat log
      console.log("Chat DOES NOT EXIST: create log")
      try {
        const newChatLog = await chats.createChatLog(currentUserID, therapistID);
      } catch (createError) {
        console.error("Error creating chat log:", createError);
      }
    }
    else{
      console.log("Chat DOES EXIST: do not create log")
    }

    return res.status(200).json({ success: true, message: 'User matched/unmatched successfully and created Chatlog with two users', user: currentUser });
  } catch (error) {
    // Handle errors
    console.error('Error matching users:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }

});

module.exports = router;