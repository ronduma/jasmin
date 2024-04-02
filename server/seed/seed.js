const connection = require('../config/mongoConnection');
const users = require('../data/users');
const { ObjectId } = require("mongodb");

const main = async () => {


  //family
  let uid_family = new ObjectId();

  try {
    let res = await users.createUser(uid_family.toString(), "family@gmail.com");
    //log
    console.log(res);
  } catch (e) {
    console.log(e);
  }


  let obj_family =  {
    uid: uid_family.toString(),
    email: "family@gmail.com",
    username: "family_username",
    profile_img: null,
    firstName: "Fam",
    lastName: "Doctor",
    location:  "New Jersey",
    age: "56",
    isTherapist: "true",
    gender: "Male",
    bio: "A well respected doctor that aims to promote family mental well being",
    occupation: "Psychiatrist",
    concerns: [],
    chatLog: [],
  }
  try {
    let res2 = await users.updateUserInfo(obj_family);
    //log
  } catch (e) {
    console.log(e);
  }
  try {
    await users.gettingStarted(obj_family);
    //log
  } catch (e) {
    console.log(e);
  }

  
  //personal
  let uid_personal = new ObjectId();

  try {
    let res = await users.createUser(uid_personal.toString(),"personal@gmail.com");
    //log
    console.log(res);
  } catch (e) {
    console.log(e);
  }


  let obj_personal =  {
    uid: uid_personal.toString(),
    email: "personal@gmail.com",
    username: "personal_username",
    profile_img: null,
    firstName: "Personal",
    lastName: "Doctor",
    location:  "New York",
    age: "56",
    isTherapist:  "true",
    gender: "Female",
    bio: "A well-experienced therapist expert in individual concerns",
    occupation: "Psychiatrist",
    concerns: [],
    chatLog: [],
  }
  try {
    let res2 = await users.updateUserInfo(obj_personal);
    //log
  } catch (e) {
    console.log(e);
  }

  try {
    await users.gettingStarted(obj_personal);
    //log
  } catch (e) {
    console.log(e);
  }

  //
  //children
  let uid_children = new ObjectId();

  try {
    let res = await users.createUser(uid_children.toString(),"children@gmail.com");
    //log
    console.log(res);
  } catch (e) {
    console.log(e);
  }


  let obj_children =  {
    uid: uid_children.toString(),
    email: "children@gmail.com",
    username: "children_username",
    profile_img: null,
    firstName: "children",
    lastName: "Doctor",
    location:  "New York",
    age: "56",
    isTherapist: "true",
    gender: "Female",
    bio: "A professional psychiatrist who has been working in the field",
    occupation: "Psychiatrist",
    concerns: [],
    chatLog: [],
  }
  try {
    await users.updateUserInfo(obj_children);
    //log
  } catch (e) {
    console.log(e);
  }
  try {
    await users.gettingStarted(obj_children);
    //log
  } catch (e) {
    console.log(e);
  }


};

main().catch((error) => {
  console.log(error);
});