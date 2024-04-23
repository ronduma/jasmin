const express = require('express');
const router = express.Router();
const users = require('../data/users');
const chats = require('../data/chats');
const path = require('path');
const xss = require('xss');

// DYLAN
router.get('/:id', async(req,res) => {
    // const chatObject = await chats.getChatByID(req.params.id);
    // // console.log("chat:", chatObject)
    // return res.status(200).json(chatObject);
    try {
      const chatObject = await chats.getChatByID(req.params.id);
      // console.log("chat:", chatObject)
      return res.status(200).json(chatObject);
    } catch (error) {
      console.error('Error fetching chat:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

router.put('/', async(req,res) => {
  try {
    let user = await users.updateUser(req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e)
    return res.status(400).json(e);
  }
});

router.put('/:id', async(req,res) => {
  try {
    let user1_id = req.params.id;
    let user2_id = req.body.user2_id;
    let user = await chats.createChatLog(user1_id, user2_id);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e)
    return res.status(400).json(e);
  }
});

router.put('/message/:id', async(req,res) => {
  try {
    let chat_id = req.params.id;
    // console.log(chat_id)
    // console.log(req.body)
    let user = await chats.createMsg(chat_id, req.body.sender, req.body.message);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e)
    return res.status(400).json(e);
  }
});

module.exports = router;