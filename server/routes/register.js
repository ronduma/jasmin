const express = require('express');
const router = express.Router();
const users = require('../data/users');
// const helpers = require('../helpers');
const xss = require('xss');

router.post('/', async(req,res) => {
  console.log(req.body)
  try {
    let user = await users.createUser(req.body.uid, req.body.email);
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.get('/:id', async(req,res) => {
  console.log(req.session.user)
  return res.status(200).json(req.session.user);
});

router.post('/:id', async(req,res) => {
  console.log(req.session.user)
  return res.status(200).json(req.session.user);
});

module.exports = router;
