const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

const createUser = async (email) => {
  const userCollection = await users();
  const userExists = await userCollection.findOne({ email: email });
  if (userExists){
    console.log("ahaha")
    throw "User with email already exists."
  }
  const user = {
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
  console.log(insertInfo)
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add user";
  }
  return { insertedUser: true, insertedId: insertInfo.insertedId };
}

const getUserById = async (userId) => {
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (!user) throw "User not found";
  return user;
}

module.exports = {
  createUser,
  getUserById,
  
};