const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const chatlog = mongoCollections.chatlog;

const users=[];
//insert object with name, roomNumber
function addUser(id, name, roomNumber){
    let user = {id, name, roomNumber};
    users.push(user);
    return users;
}
//

function deleteUser(id){
    let deleteUser;
    let i = 0;
    if (!id){
        throw 'No socket-io to delete'
    }
    for (elem of users){
        if (elem.id === id){
            deleteUser = elem;
            users.splice(i, 1);
            return deleteUser;
        }
        i++;
    }
    return deleteUser;
}

//Given this schema
const addMessages = async (id, name, psychologist, message)=>{
    //Error Handling
    const chatLog = await chatlog()
    const date = new Date();
    let newMessage={
        _id: new ObjectId(),
        user: name.trim(),
        userSentTo: psychologist.trim(),
        message: message.trim(),
        TimeSent: date,
    }
    const insertedInfo = await chatLog.insertOne(newMessage);
    if (!insertedInfo.acknowledged || !insertedInfo.insertedId) {
        throw "Could not add message";
    }
    
    newMessage._id = newMessage._id.toString();

    return newMessage;
}

const getMessagebyUsers = async (messageID) => {
    if (!messageID) throw 'You must provide an id to search for';
      if (typeof messageID !== 'string') throw 'Id must be a string';
      if (messageID.trim().length === 0)
        throw 'Id cannot be an empty string or just spaces';
        messageID = messageID.trim();
      if (!ObjectId.isValid(messageID)) throw 'invalid object ID';
      const chatCollection = await chatlog();
      const messageFind = await chatCollection.findOne({_id: ObjectId(messageID)});
      if (messageFind === null) throw 'No message with that id';
      messageFind._id = messageFind._id.toString();
      return messageFind;
  };



  const getMessagesByUsers= async (username, userSentTo) => {
    // Error Validate checkUserValid(username);
    // console.log("user: " +username)
    // console.log("userSentTo:"+userSentTo)
    if (!username || !userSentTo) {
        throw ("Username and userSentTo must be provided.");
      }
      let usernameLower = username.toLowerCase().trim();
      let userSentToLower = userSentTo.toLowerCase().trim();
      let chatlog_collection = await chatlog();
      
      //check both ways
      let messages = await chatlog_collection.find({
        $or: [
            {user: usernameLower, userSentTo: userSentToLower},
            {user: userSentToLower, userSentTo: usernameLower}
        ]}).toArray();


      return messages;
  };


const getMessageOldesttoNewest = async (username, userSentTo) => {
    return;
}


// const  = async (username, userSentTo) => {
//     return;
// }

// const getMessageOldesttoNewest = async (username, userSentTo) => {
//     return;
// }


module.exports = {addUser, deleteUser,addMessages, getMessagesByUsers}