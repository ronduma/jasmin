const { MongoClient, ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const dayjs = require('dayjs');
const chats = mongoCollections.chats;
const users = mongoCollections.users;

const usersData = require('../data/users');
const geminiData = require('../data/gemini')

const createChatLog = async (
	user1_id,
  user2_id
) => {
  const userCollection = await users();
	const chatCollection = await chats();

  const chatExists = await chatCollection.findOne(
    {
      user1_id: user1_id,
      user2_id: user2_id
    }
  )

  if (!chatExists) {
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
    const user1 = await userCollection.findOneAndUpdate(
      { _id: user1_id },
      { $push: {chatLog : insertInfo.insertedId} },
      { returnDocument: "after" }
    );
    const user2_data = await usersData.getUserById(user2_id);
    const user2 = await userCollection.findOneAndUpdate(
      { _id: user2_id },
      { $push: {chatLog : insertInfo.insertedId} },
      { returnDocument: "after" }
    );
  
    return { insertedUser: true, insertedId: insertInfo.insertedId };
  }
}

const createMsg = async (
  id,
  sender,
  message
) => {
  const msg = {
    sender: sender, 
    message: message, 
    timestamp: dayjs().format('MM-DD-YYYY HH:mm:ss')
  };
  // console.log(id, msg)
  const chatCollection = await chats();
  const insertInfo = await chatCollection.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		{ $push: {chatLog : msg} },
		{ returnDocument: "after" }
	);
  let user1_id = insertInfo.user1_id;
  let user2_id = insertInfo.user2_id;
  if (sender.id == user1_id){
    console.log(user1_id)
    return user2_id
  } else{
    console.log(user2_id)
    return user1_id
  }
}

const createKaiMsg = async (
  id,
  sender,
  message
) => {
  const chatCollection = await chats();
  let response = await geminiData.sendMessage(message);
  const response_msg = {
    sender: {
      id : 1,
      name : "kAI",
      doneTyping : false
    }, 
    message: response, 
    timestamp: dayjs().format('MM-DD-YYYY HH:mm:ss')
  }
  const insertResponseInfo = await chatCollection.findOneAndUpdate(
		{ _id: new ObjectId(id) },
		{ $push: {chatLog : response_msg} },
		{ returnDocument: "after" }
	);
}

const kaiMsgDoneTyping = async (
  id,
  timestamp
) => {
  const chatCollection = await chats();
  const filter = {
    'chatLog.timestamp': timestamp
  };
  const update = {"$set": {"chatLog.$.sender.doneTyping": true}}
  const setResponseInfo = await chatCollection.findOneAndUpdate(filter, update);
}

const getChatByID = async (uid) => {
  // console.log(uid)
  const chatCollection = await chats();
	const chat = await chatCollection.findOne({ _id: new ObjectId(uid) });
	if (!chat) throw "Chat not found";
	return chat;
}

module.exports = {
	createChatLog,
  createMsg,
  createKaiMsg,
  getChatByID,
  kaiMsgDoneTyping
};
