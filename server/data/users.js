const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

const createUser = async (uid, email) => {
  const userCollection = await users();
  const userExists = await userCollection.findOne({ uid: uid });
  if (userExists){
    console.log("ahaha")
    throw "User with email already exists."
  }

  console.log(uid)

  const user = {
    _id : uid,
    email : email,
    username : null,
    profile_img : null,
    firstName : null,
    lastName : null,
    location : null,
    age : null, 
    isPsychologist : null,
    gender : null,
    bio : null,
    occupation : null,
    concerns : [],
    chatLog : []
  }; 
  const insertInfo = await userCollection.insertOne(user);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add user";
  }
  return { insertedUser: true, insertedId: insertInfo.insertedId };
}

const updateUser = async (
  uid,
  email,
  username,
  profile_img,
  firstName,
  lastName,
  location,
  age,
  gender,
  occupation,
  concerns,
  chatLog
) => {
  let updated = {
    email,
    username,
    profile_img,
    firstName,
    lastName,
    location,
    age,
    gender,
    occupation,
    concerns,
    chatLog
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ _id : uid });
  console.log(user)
} 

const getUserById = async (uid) => {
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: uid});
  if (!user) throw "User not found";
  return user;
}

module.exports = {
  createUser,
  updateUser,
  getUserById,
  
};