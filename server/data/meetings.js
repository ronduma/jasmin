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



const isMatched = async (patient, therapist) => {
  // Check if user1 is a therapist and user2 is in their patients array
  const userCollection = await users();
  let user1 = await user.getUserById(patient);
  let user2 = await user.getUserById(therapist);

  if ((!user1.isTherapist && user1.therapist === user1._id) && (user2.isTherapist && user2.patients.includes(user2._id))) {
    return true;
  }
  return false;
};


const createMeeting = async (userID1, userID2, date, time) => {
  const meetingCollection = await meetings();
  
  if (!(await isMatched(userID1, userID2))){
    throw 'Patient and Therapist not Matched. Can not create meeting';
  }

  //check if time is already chosen for patient or therapist
  await ifMeetingExistByTimePatient(userID1,time);
  await ifMeetingExistByTimeTherapist(userID2,time);
  
  


  let newMeeting = {
    _id: new ObjectId(),
    patient: userID1,
    therapist: userID2,
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