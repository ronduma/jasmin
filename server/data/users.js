const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

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

// const updateUser = async (
//   {uid,
//   email,
//   username,
//   profile_img,
//   firstName,
//   lastName,
//   location,
//   age,
//   isTherapist,
//   gender,
//   occupation,
//   concerns,
//   chatLog}
// ) => {
//   let updated = Object.fromEntries(
//     Object.entries({
//       email,
//       username,
//       profile_img,
//       firstName,
//       lastName,
//       location,
//       age,
//       isTherapist,
//       gender,
//       occupation,
//       concerns,
//       chatLog
//     }).filter(([key, value]) => value !== undefined && value !== null)
//   );
//   const userCollection = await users();


//   const user = await userCollection.findOneAndUpdate(
//     { _id : uid },
//     { $set: updated },
//     { returnDocument: 'after' }
//   );
// }

const updateUser = async ({
  uid,
  email,
  username,
  profile_img,
  firstName,
  lastName,
  location,
  age,
  isTherapist,
  gender,
  bio,
  occupation,
  concerns,
  chatLog
}) => {
  const userCollection = await users();
  const existingUser = await getUserById(uid);

  // Mostly strings
  let updated = {
    email: email !== '' ? email : existingUser.email,
    username: username !== '' ? username : existingUser.username,
    profile_img: profile_img !== null ? profile_img : existingUser.profile_img,
    firstName: firstName !== '' ? firstName : existingUser.firstName,
    lastName: lastName !== '' ? lastName : existingUser.lastName,
    location: location !== '' ? location : existingUser.location,
    age: age !== '' ? age : existingUser.age,
    isTherapist: isTherapist !== '' ? isTherapist : existingUser.isTherapist,
    bio: bio !== '' ? bio : existingUser.bio,
    gender: gender !== '' ? gender : existingUser.gender,
    occupation: occupation !== '' ? occupation : existingUser.occupation,
    concerns: concerns !== '' ? concerns : existingUser.concerns,
    chatLog: chatLog !== '' ? chatLog : existingUser.chatLog
  };

  // Filter out keys with undefined values
  updated = Object.fromEntries(
    Object.entries(updated).filter(([key, value]) => value !== undefined)
  );

  const user = await userCollection.findOneAndUpdate(
    { _id: uid },
    { $set: updated },
    { returnDocument: 'after' }
  );

  return user;
};

  

const getUserById = async (uid) => {
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: uid});
  if (!user) throw "User not found";
  return user;
}

const getUserByUsername = async (username) => {
  username = username.toLowerCase();
  const userCollection = await users();
  const user = await userCollection.findOne({ username: username });
  if (!user) throw 'Error: There is no user with the given name';
  return user;
}

module.exports = {
  createUser,
  updateUser,
  getUserById,
  getUserByUsername
  
};