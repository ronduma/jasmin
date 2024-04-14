const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const meetings = mongoCollections.meetings;
const users = mongoCollections.users;
const user = require("../data/users.js")


// if not match you can not chose a time

const getMeetingByTimePatient = async (userID1, time) => {

  const meetingCollection = await meetings();
  const meeting = await meetingCollection.findOne({ patient:userID1, time: time });
  if (!meeting) throw 'Error: There is no meeting with the given time and patient ' + userID1 ;
  return meeting;
}

const getMeetingByTimeTherapist = async (userID1, time) => {
  const meetingCollection = await meetings();
  const meeting = await meetingCollection.findOne({ therapist:userID1, time: time });
  if (!meeting) throw 'Error: There is no meeting with the given time and therapist ' + userID1 ;
  return meeting;
}

const getMeetingsByTimeTherapist = async (userID1) => {
  const meetingCollection = await meetings();
  const meetings = await meetingCollection.find({ therapist: userID1}).toArray();
  if (!meetings || meetings.length === 0) throw new Error('Error: There are no meetings from the given therapist ' + userID1);
  return meetings;
}


const ifMeetingExistByTimePatient = async (userID1, time) => {

  const meetingCollection = await meetings();
  const meeting = await meetingCollection.findOne({ patient:userID1, time: time });
  if (meeting) throw 'Error: There is is already a meeting with the given time and patient ' + userID1 ;
  return false;
}
const ifMeetingExistByTimeTherapist = async (userID1, time) => {

  const meetingCollection = await meetings();
  const meeting = await meetingCollection.findOne({ therapist:userID1, time: time });
  if (meeting) throw 'Error: There is is already a meeting with the given time and Therapist ' + userID1 ;
  return false;
}



const isMatched = async (userID1, userID2) => {
  // Check if user1 is a therapist and user2 is in their patients array
  const userCollection = await users();
  
  let therapist = await user.checkUserifTherapist(userID1);
  let tempPatientID;
  let tempTherapistID;
  if (therapist == true){
    tempTherapistID=userID1;
    tempPatientID=userID2;
    
  }
  else {
    tempTherapistID=userID2;
    tempPatientID=userID1;


  }
  let user1 = await user.getUserById(tempPatientID);
  let user2 = await user.getUserById(tempTherapistID);

  //if patient is not therapist & patient therapist = therapist && user2.istherapist && user2.includes the patient
  if ((!user1.isTherapist && user1.therapist === user2._id) && (user2.isTherapist && user2.patients.includes(user1._id))) {
    return true;
  }
  return false;
};


const createMeeting = async (userID1, userID2, time) => {
  const meetingCollection = await meetings();

  let account = await user.getUserById(userID1);
	if (!account) throw "User not found";
  
  
  if ((await isMatched(userID1, userID2) == false)){
    throw 'Patient and Therapist not Matched. Can not create meeting';
  }

  let therapist = await user.checkUserifTherapist(userID1);
  let tempPatientID;
  let tempTherapistID;
  if (therapist == true){
    tempTherapistID=userID1;
    tempPatientID=userID2;
    
  }
  else {
    tempTherapistID=userID2;
    tempPatientID=userID1;


  }

  //check if time is already chosen for patient or therapist
  await ifMeetingExistByTimePatient(userID1,time);
  await ifMeetingExistByTimeTherapist(userID2,time);
  
  


  let newMeeting = {
    _id: new ObjectId(),
    patient: tempPatientID,
    therapist: tempTherapistID,
    time: time,
};

const insertMeeting = await meetingCollection.insertOne(newMeeting);
if (!insertMeeting.acknowledged || !insertMeeting.insertedId) {
  throw "Could not add Meeting";
}
  return newMeeting;
};


module.exports = {
  createMeeting,
  isMatched
};