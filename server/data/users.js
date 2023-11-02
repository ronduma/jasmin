const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const helpers = require('../helpers');

const createUser = async (
  username,
  password,
  itinerary = [],
  posts = [],
  likes = [],
  profilePic = null
) => {
  // input validation
  helpers.validateUsername(username);
  helpers.validatePassword(password);
  // trim inputs
  username = username.trim();
  password = password.trim();
  // create user
  const userCollection = await users();
  const userExists = await userCollection.findOne({ username: username });
  if (userExists) { throw 'Error: A user with that username already exists.' }
  password = await bcrypt.hash(password, saltRounds);
  let newUser = {
    username: username,
    password: password,
    itinerary: itinerary,
    posts: posts,
    likes: likes,
    profilePic: profilePic
  };
  const insertInfo = await userCollection.insertOne(newUser);
  console.log(insertInfo)
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add user";
  }
  return { insertedUser: true, insertedId: insertInfo.insertedId };
};

const checkUser = async (
  username, password
) => {
  helpers.validateUsername(username);
  helpers.validatePassword(password);
  username = username.trim();
  password = password.trim();


  const userCollection = await users();
  const userExists = await userCollection.findOne({ username: username });

  if (!userExists) {
    throw 'Error: User with the given username or password does not exist. Try Again!';
  }
  let compare = await bcrypt.compare(password, userExists.password);
  if (compare) {
    return { authenticatedUser: true };
  }
  else {
    throw 'Error: Invalid Password. Try Again!';
  }
}

const getUserByUsername = async (username) => {
  username = username.toLowerCase();
  const userCollection = await users();
  const user = await userCollection.findOne({ username: username });
  if (!user) throw 'Error: There is no user with the given name';
  // user._id = user._id.string();
  return user;
}

const getUserById = async (userId) => {
  helpers.validateId(userId);
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: new ObjectId(userId) });
  if (!user) throw "User not found";
  return user;
}

module.exports = {
  createUser,
  checkUser,
  getUserByUsername,
  getUserById,
};
