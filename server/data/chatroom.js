const mongoCollections = require("../config/mongoCollections");
const chatlog  = mongoCollections.chatlog;
const { ObjectId } = require('mongodb');
//Disconnecting from room I need the user name
const users=[];
// const mongoCollections = require("../config/mongoCollections");


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
//jasmin

// need psychologist ID 

const addMessages = async (id, name, psychologist, message)=>{
    //Error Handling
    const chatLog = await chatlog()
    const date = new Date();
    let newMessage={
        _id: new ObjectId(),
        user: name.trim(),
        userSentTo: psychologist,
        message: message.trim(),
        TimeSent: date,
        // active 
    }
    //
    //
    const insertedInfo = await chatLog.insertOne(newMessage);
    if (!insertedInfo.acknowledged || !insertedInfo.insertedId) {
        throw "Could not add message";
    }
    
    newMessage._id = newMessage._id.toString();

    return newMessage;

    


}

const getMessagebyUsers = async (recipeID) => {
    if (!recipeID) throw 'You must provide an id to search for';
      if (typeof recipeID !== 'string') throw 'Id must be a string';
      if (recipeID.trim().length === 0)
        throw 'Id cannot be an empty string or just spaces';
        recipeID = recipeID.trim();
      if (!ObjectId.isValid(recipeID)) throw 'invalid object ID';
      const recipeCollection = await recipes();
      const recipeo = await recipeCollection.findOne({_id: ObjectId(recipeID)});
      if (recipeo === null) throw 'No recipe with that id';
      recipeo._id = recipeo._id.toString();
      return recipeo;
  };
  const getUserbyUsername= async (username) => {
    // Error Validate checkUserValid(username);
      let usernameLower = username.toLowerCase().trim();
      let userExist = false;
      let user_collection = await users();
      let found = await user_collection.findOne({ username: usernameLower });
      if (found) {
        userExist = true;
      }
      if (userExist == false){
        throw "There is NO user!";
      }
      return found;
  };

  const getMessagesByUsers= async (username, userSentTo) => {
    // Error Validate checkUserValid(username);
    console.log("user: " +username)
    console.log("userSentTo:"+userSentTo)
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





module.exports = {addUser, deleteUser,addMessages, getMessagesByUsers}