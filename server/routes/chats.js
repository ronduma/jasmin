const express = require('express');
const router = express.Router();
const users = require('../data/users');
const chats = require('../data/chats');
const path = require('path');
const xss = require('xss');


router.get('/:id', async(req,res) => {
    const chatObject = await chats.getChatByID(req.params.id);
    // console.log("chat:", chatObject)
    return res.status(200).json(chatObject);
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

router.put('/kai-message/:id', async(req,res) => {
  try {
    let chat_id = req.params.id;
    let user = await chats.createKaiMsg(chat_id, req.body.sender, req.body.message);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e)
    return res.status(400).json(e);
  }
});

router.put('/kai-message/done-typing/:id', async(req,res) => {
  try {
    let chat_id = req.params.id;
    let timestamp = req.body.timestamp;
    let user = await chats.kaiMsgDoneTyping(chat_id, timestamp);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e)
    return res.status(400).json(e);
  }
});

module.exports = router;