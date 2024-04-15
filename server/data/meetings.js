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
  const meetingList = await meetingCollection.find({ therapist: userID1}).toArray();
  if (!meetingList || meetingList.length === 0){
    console.log('Error: There are no meetings from the given therapist ' + userID1);
    return [];
  }
  return meetingList;
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
  await ifMeetingExistByTimePatient(tempPatientID,time);
  await ifMeetingExistByTimeTherapist(tempTherapistID,time);

  let patientObject = await user.getUserById(tempPatientID);
  let therapistObject = await user.getUserById(tempTherapistID);
  let patientName = patientObject.username;
  let therapistName = therapistObject.username;
  


  let newMeeting = {
    _id: new ObjectId().toString(),
    patient: tempPatientID,
    therapist: tempTherapistID,
    patientName: patientName,
    therapistName: therapistName,
    time: time,
};

const insertMeeting = await meetingCollection.insertOne(newMeeting);
if (!insertMeeting.acknowledged || !insertMeeting.insertedId) {
  throw "Could not add Meeting";
}
  return newMeeting;
};


const deleteMeeting = async (userID1, userID2, time) => {
  const meetingCollection = await meetings();


  if ((await isMatched(userID1, userID2) == false)){
    throw 'Patient and Therapist not Matched. Can not delete meeting';
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
  await ifMeetingExistByTimePatient(tempPatientID,time);
  await ifMeetingExistByTimeTherapist(tempTherapistID,time);


const deleteMeeting = await meetingCollection.deleteOne({patient: tempPatientID, therapist:tempTherapistID, time: time});
  return deleteMeeting;
};


module.exports = {
  createMeeting,
  deleteMeeting,
  isMatched,
  getMeetingsByTimeTherapist
};