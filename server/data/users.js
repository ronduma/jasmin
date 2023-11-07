const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

const getUserById = async (userId) => {
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) throw "User not found";
    return user;
}

module.exports = {
  getUserById,
  
};