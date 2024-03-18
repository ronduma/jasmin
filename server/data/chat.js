const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const chats = mongoCollections.chat;

const createChat = async (username1, username2, sender, message) => {
  const chatCollection = await chats();

  //make sure that username1 < username2
  if (username1 > username2) {
    let temp = username1;
    username1 = username2;
    username2 = temp;
  }

  const chatId = await chatCollection.findOne({
    username1: username1,
    username2: username2,
  });

  var chatLog = chatId.chatLog;
  const newChat = { sender, message };
  chatLog.push(chatLog);
  //array of {sender, message}

  const chat = {
    _id: cid,
    username1: username1,
    username2: username2,
    chatLog: chatLog,
  };
  const query = { _id: cid }; // Assuming cid is the _id of the chat document you want to update
  const update = { $push: { chatLog: newChat } }; // Assuming newChat contains the new chat message
  const options = { returnOriginal: false }; // This will return the modified document

  await chatCollection.updateOne(query, update, options);

  return { chat };
};

module.exports = {
  createChat,
};
