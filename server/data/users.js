const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const fs = require("fs");

const validation = require("./validation");

const createUser = async (uid, email) => {
  const userCollection = await users();
  const userExists = await userCollection.findOne({ uid: uid });
  if (userExists) {
    throw "User with email already exists.";
  }

  const user = {
    _id: uid,
    email: email,
    username: null,
    profile_img: null,
    firstName: null,
    lastName: null,
    location: null,
    age: null,
    isTherapist: null,
    gender: null,
    bio: null,
    occupation: null,
    concerns: [],
    chatLog: [],
  };
  const insertInfo = await userCollection.insertOne(user);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add user";
  }
  return { insertedUser: true, insertedId: insertInfo.insertedId };
};

const gettingStarted = async ({
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
  chatLog,
}) => {
  isTherapist = isTherapist === "true" ? true : false;
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
  console.log(validation.validateUserUpdate(updated));
  const userCollection = await users();

  const user = await userCollection.findOneAndUpdate(
    { _id: uid },
    { $set: updated },
    { returnDocument: "after" }
  );
};

const updateUserInfo = async ({
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
  occupation,
  concerns,
  chatLog,
}) => {
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
  const userCollection = await users();

  // Filter out keys with undefined values
  updated = Object.fromEntries(
    Object.entries(updated).filter(([key, value]) => value !== undefined)
  );
  const user = await userCollection.findOneAndUpdate(
    { _id: uid },
    { $set: updated },
    { returnDocument: "after" }
  );
};

const updateProfile = async (uid, updated) => {
  // Patient profile update
  // Error handling in routes
  let user = await getUserById(uid);
  if (!user) throw "User not found";
  const userCollection = await users();
  const updatedUser = await userCollection
    .findOneAndUpdate(
      { _id: uid },
      { $set: updated },
      { returnDocument: "after" }
    )
    .catch((e) => {
      console.error(e);
    });
  if (!updatedUser) {
    throw "Error: User not found";
  }
};

const getUserById = async (uid) => {
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: uid });
  if (!user) throw "User not found";
  return user;
};

const emptyUploadsFolder = async () => {
  const folderPath = "./uploads";
  const files = await fs.promises.readdir(folderPath);

  for (const file of files) {
    await fs.promises.unlink(`${folderPath}/${file}`);
  }
};

const saveImgToDB = async (id, path) => {
  const image = fs.readFileSync(path);

  try {
    const userCollection = await users();
    const userExists = await userCollection.findOne({ _id: id });
    if (userExists) {
      console.log("User found. Profile pic uploading now.");
    }
    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: id },
      { $set: { profile_img: image } },
      { returnOriginal: false }
    );

    if (!updatedUser) {
      throw `Error: User with id ${id} not found`;
    }

    console.log("User updated.");
    await emptyUploadsFolder();
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createUser,
  updateUserInfo,
  updateProfile,
  getUserById,
  gettingStarted,
  saveImgToDB,
};
