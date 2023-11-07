const express = require('express');
const router = express.Router();
const users = require('../data/users');
const helpers = require('../helpers');
const xss = require('xss');

router.post('/', async(req,res) => {
  console.log(req.body)
  // let user = await users.createUser()
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
