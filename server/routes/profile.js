const express = require('express');
const router = express.Router();
const helpers = require('../helpers');
const users = require('../data/users');
const path = require('path');
const xss = require('xss');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage })

router.get('/:id', async(req,res) => {
  try {
    const userObject = await users.getUserById(req.params.id);
    console.log("user:", userObject)
    return res.status(200).json(userObject);
  } catch (e){
    console.log(e)
    return res.status(400).json(e);
  }
})

router.put('/', async(req,res) => {
  try {
    let user = await users.updateUserInfo(req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e)
    return res.status(400).json(e);
  }
});

router.put('/getting-started', async(req,res) => {
  try {
    let user = await users.gettingStarted(req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e)
    return res.status(400).json(e);
  }
});

router.put('/:id/profile-pic', upload.single('file'), async(req,res) => {
  const file = req.file;
  if (!file) {
      return res.status(400).json({ error: "No image file uploaded" });
  }
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return res.status(400).json({ error: "Please upload a valid image file (jpg or png)" });
  }
  console.log("saving file to /uploads")
  await users.saveImgToDB(req.params.id, file.path);
  return res.status(200).json('');
});

router.put('/therapist', async(req,res) => {
  try {
    let user = await users.updateUserInfo(req.body);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e)
    return res.status(400).json(e);
  }
});

module.exports = router;