const express = require('express');
const router = express.Router();
const chats = require('../data/chats');
const path = require('path');
const xss = require('xss');

router.post('/', async(req,res) => {
    try {
      let chat = await chats.createChat(req.body.sender, req.body.receiver,req.body.message);
      return res.status(200).json(chat);
    } catch (e) {
      return res.status(400).json(e);
    }
  });
  
  
  module.exports = router;