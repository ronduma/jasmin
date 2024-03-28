const users = require('data/users');
const connection = require('config/mongoConnection');

const main = async () => {

  let family_therapist = undefined;
  let child_therapist = undefined;
  let personal_therapist = undefined;
 
  try {
    Claris = await users.create();
    //log
    console.log(Claris);
  } catch (e) {
    console.log(e);
  }

};

main().catch((error) => {
  console.log(error);
});