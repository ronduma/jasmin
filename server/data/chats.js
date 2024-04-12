const { MongoClient, ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const dayjs = require('dayjs');
const chats = mongoCollections.chats;
const users = mongoCollections.users;

const usersData = require('../data/users');

const createChatLog = async (
	user1_id,
  user2_id
) => {
  const userCollection = await users();
	const chatCollection = await chats();
  const log = {
    user1_id: user1_id,
    user2_id: user2_id,
    chatLog: []
  }
  const insertInfo = await chatCollection.insertOne(log);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
		throw "Could not add chat";
	}

  const user1_data = await usersData.getUserById(user1_id);
  const user2_data = await usersData.getUserById(user2_id);

  const user1_name = user1_data.firstName + " " + user1_data.lastName;
  const user2_name = user2_data.firstName + " " + user2_data.lastName;

  const user1 = await userCollection.findOneAndUpdate(
		{ _id: user1_id },
		{ $push: {chatLog : {id : insertInfo.insertedId, name : user2_name}} },
		{ returnDocument: "after" }
	);
  const user2 = await userCollection.findOneAndUpdate(
		{ _id: user2_id },
		{ $push: {chatLog : {id : insertInfo.insertedId, name : user1_name}} },
		{ returnDocument: "after" }
	);

	return { insertedUser: true, insertedId: insertInfo.insertedId };
}

const createMsg = async (
  id,
  sender,
  message
) => {
  const msg = {sender: sender, message: message, timestamp: dayjs()};
  console.log(id, msg)
  const chatCollection = await chats();
  const insertInfo = await chatCollection.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		{ $push: {chatLog : msg} },
		{ returnDocument: "after" }
	);
  console.log(insertInfo)
}

const getChatByID = async (uid) => {
  const chatCollection = await chats();
	const chat = await chatCollection.findOne({ _id: new ObjectId(uid) });
	if (!chat) throw "Chat not found";
	return chat;
}

module.exports = {
	createChatLog,
  createMsg,
  getChatByID
};
