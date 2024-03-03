const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

const validation = require("./validation");

const createUser = async (uid, email) => {
  const userCollection = await users();
  const userExists = await userCollection.findOne({ uid: uid });
  if (userExists){
    throw "User with email already exists."
  }

  const user = {
    _id : uid,
    email : email,
    username : null,
    profile_img : null,
    firstName : null,
    lastName : null,
    location : null,
    age : null, 
    isTherapist : null,
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

const gettingStarted = async (
  {uid,
  email,
  username,
  profile_img,
  firstName,
  lastName,
  location,
  age,
  isTherapist,
  gender,
  occupation,
  concerns,
  chatLog}
) => {
  let updated = Object.fromEntries(
    Object.entries({
      username,
      // profile_img,
      firstName,
      lastName,
      location,
      age,
      isTherapist,
      gender,
      occupation,
      // concerns,
      // chatLog
    })
  );
  validation.validateUserUpdate(updated);
  console.log(validation.validateUserUpdate(updated))
  const userCollection = await users();


  const user = await userCollection.findOneAndUpdate(
    { _id : uid },
    { $set: updated },
    { returnDocument: 'after' }
  );
}

const updateUserInfo = async (
  {uid,
  email,
  username,
  profile_img,
  firstName,
  lastName,
  location,
  age,
  isTherapist,
  gender,
  occupation,
  concerns,
  chatLog}
) => {
  let updated = Object.fromEntries(
    Object.entries({
      username,
      // profile_img,
      firstName,
      lastName,
      location,
      age,
      // isTherapist,
      gender,
      occupation,
      // concerns,
      // chatLog
    })
  );
  validation.validateUserUpdate(updated);
  console.log(validation.validateUserUpdate(updated))
  const userCollection = await users();


  const user = await userCollection.findOneAndUpdate(
    { _id : uid },
    { $set: updated },
    { returnDocument: 'after' }
  );
}
  

const getUserById = async (uid) => {
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: uid});
  if (!user) throw "User not found";
  return user;
}

module.exports = {
  createUser,
  updateUserInfo,
  getUserById,
  gettingStarted  
};