const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const chats = mongoCollections.chats;
const fs = require("fs");
const dayjs = require("dayjs");
const meetings = mongoCollections.meetings;
const validation = require("./validation");

const createUser = async (uid, email) => {
	const userCollection = await users();
	const chatCollection = await chats();

	const userExists = await userCollection.findOne({ uid: uid });
	if (userExists) {
		throw "User with email already exists.";
	}

	const user = {
		_id: uid,
		email: email,
		username: null,
		profile_img: null,
		firstName: null,
		lastName: null,
		location: null,
		age: null,
		isTherapist: null,
		gender: null,
		bio: null,
		occupation: null,
		concerns: [],
		chatLog: [],
		patients: [],
		therapist: null,
		specialty: [],
		reviews : [],
		overallRating: 0.0,
		pdf_files: [],
		price: null,
		noti: {unread: 0, noti_str: []},
	};

	// console.log("inserting user:", user)

	const insertInfo = await userCollection.insertOne(user);
	if (!insertInfo.acknowledged || !insertInfo.insertedId) {
		throw "Could not add user";
	}

  const log = {
    user1_id: 1,
    user2_id: uid,
    chatLog: []
  }
  const insertChatInfo = await chatCollection.insertOne(log);
	if (!insertChatInfo.acknowledged || !insertChatInfo.insertedId) {
		throw "Could not add chat";
	}

  const user1 = await userCollection.findOneAndUpdate(
		{ _id: uid },
		{ $push: {chatLog : insertChatInfo.insertedId} },
		{ returnDocument: "after" }
	);

	return { insertedUser: true, insertedId: insertInfo.insertedId };
};

const gettingStarted = async ({
	uid,
	email,
	username,
	profile_img,
	firstName,
	lastName,
	location,
	age,
	isTherapist,
	gender,
	bio,
	occupation,
	concerns,
	chatLog,
}) => {
	isTherapist = isTherapist === "true" ? true : false;
	let updated = Object.fromEntries(
		Object.entries({
			username,
			// profile_img,
			firstName,
			lastName,
			location,
			age,
			isTherapist,
			gender,
			occupation,
			// concerns,
			// chatLog
		})
	);
	validation.validateUserUpdate(updated);
	// console.log(validation.validateUserUpdate(updated));
	const userCollection = await users();

	const user = await userCollection.findOneAndUpdate(
		{ _id: uid },
		{ $set: updated },
		{ returnDocument: "after" }
	);
};

const updateUserInfo = async ({
	uid,
	email,
	username,
	profile_img,
	firstName,
	lastName,
	location,
	age,
	isTherapist,
	gender,
	occupation,
	concerns,
	chatLog,
}) => {
	let updated = Object.fromEntries(
		Object.entries({
			username,
			// profile_img,
			firstName,
			lastName,
			location,
			age,
			// isTherapist,
			gender,
			occupation,
			// concerns,
			// chatLog
		})
	);
	validation.validateUserUpdate(updated);
	const userCollection = await users();

	// Filter out keys with undefined values
	updated = Object.fromEntries(
		Object.entries(updated).filter(([key, value]) => value !== undefined)
	);
	const user = await userCollection.findOneAndUpdate(
		{ _id: uid },
		{ $set: updated },
		{ returnDocument: "after" }
	);
};

const updateProfile = async (uid, updated) => {
	// Patient profile update
	// Error handling in routes
	if (!uid) throw "Error: User ID not provided";
	let user = await getUserById(uid);
	if (!user) throw "User not found";
	const userCollection = await users();
	const updatedUser = await userCollection
		.findOneAndUpdate(
			{ _id: uid },
			{ $set: updated },
			{ returnDocument: "after" }
		)
		.catch((e) => {
			console.error(e);
		});
	if (!updatedUser) {
		throw "Error: User not found";
	}
};

const getUserById = async (uid) => {
	const userCollection = await users();
	const user = await userCollection.findOne({ _id: uid });
	if (!user) throw "User not found";
	return user;
};

const emptyUploadsFolder = async () => {
	const folderPath = "./uploads";
	const files = await fs.promises.readdir(folderPath);

	for (const file of files) {
		if (file === "readme.txt") continue;
		await fs.promises.unlink(`${folderPath}/${file}`);
	}
};

const saveImgToDB = async (id, path) => {
	const image = fs.readFileSync(path);

	try {
		const userCollection = await users();
		const userExists = await userCollection.findOne({ _id: id });
		if (userExists) {
			console.log("User found. Profile pic uploading now.");
		}
		const updatedUser = await userCollection.findOneAndUpdate(
			{ _id: id },
			{ $set: { profile_img: image } },
			{ returnOriginal: false }
		);

		if (!updatedUser) {
			throw `Error: User with id ${id} not found`;
		}

		console.log("User updated.");
		await emptyUploadsFolder();
	} catch (err) {
		console.error(err);
	}
};

const savePdfToDB = async (id, path, filename) => {
	const pdf = fs.readFileSync(path);
  
	try {
	  const userCollection = await users();
	  const userExists = await userCollection.findOne({ _id: id });
	  if (!userExists) throw "Error: User not found";
	  if (!userExists.pdf_files) throw "Error: User has no pdf files";
  
	  const currPdf = userExists.pdf_files;
	  if (currPdf.length > 2) throw "Error: User has reached the maximum number of pdf files";
	  currPdf.push({ filename, content: pdf });
  
	  const updatedUser = await userCollection.findOneAndUpdate(
		{ _id: id },
		{ $set: { pdf_files: currPdf } },
		{ returnOriginal: false }
	  );
  
	  if (!updatedUser) {
		throw `Error: User with id ${id} not found`;
	  }
  
	  console.log("User updated.");
	  await emptyUploadsFolder();
	  return updatedUser.pdf_files;
	} catch (err) {
	  console.error(err);
	}
  };

  const getPdfFromDB = async (id, index) => {
    if (index > 2 || index < 0) throw "Error: Index out of bounds";
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (!user) throw "Error: There is no user with the given name";
    if (!user.pdf_files) throw "Error: There are no pdf files";
    if (!user.pdf_files[index]) throw "Error: There is no pdf file with the given index";

    const tempFilePath = `./uploads/${user.pdf_files[index].filename}`;

    // Check if content is a Buffer
    if (Buffer.isBuffer(user.pdf_files[index].content)) {
        fs.writeFileSync(tempFilePath, user.pdf_files[index].content);
    } else if (user.pdf_files[index].content.read) { // Check if content is a Binary instance
        // Convert Binary to Buffer and write to file
        const buffer = Buffer.from(user.pdf_files[index].content.read(0, user.pdf_files[index].content.length()));
        fs.writeFileSync(tempFilePath, buffer);
    } else {
        throw "Error: Unknown file content type";
    }

    console.log("PDF file ready for download.");
    return tempFilePath;
};
  
const deletePdfFromDB = async (id, index) => {
	if (index > 2 || index < 0) throw "Error: Index out of bounds";
	const userCollection = await users();
	const user = await userCollection.findOne({ _id: id });
	if (!user) throw "Error: There is no user with the given name";
	if (!user.pdf_files) throw "Error: There are no pdf files";
	if (!user.pdf_files[index]) throw "Error: There is no pdf file with the given index";
	const updatedPdf = user.pdf_files;
	updatedPdf.splice(index, 1);
	const updatedUser = await userCollection.findOneAndUpdate(
		{ _id: id },
		{ $set: { pdf_files: updatedPdf } },
		{ returnOriginal: false }
	);
	if (!updatedUser) {
		throw `Error: User with id ${id} not found`;
	}
	console.log("PDF file deleted.");
};

const getNotifications = async (uid) => {
	const userCollection = await users();
	const user = await userCollection.findOne({ _id: uid });
	if (!user) throw "Error: There is no user with the given name";
	//if noti doesnt exist add it as an empty array
	if (!user.noti) {
		const updatedUser = await userCollection.findOneAndUpdate(
			{ _id: uid },
			{ $set: { noti: {unread: 0, noti_str: [] } } },
			{ returnDocument: "after" }
		);
		return {unread: 0, noti_str: [] };
	}
	return user.noti;
}

//update databse with notifications
const updateNotifications = async (uid, unread, noti_str) => {
	if (unread < 0) throw "Error: Unread notifications cannot be negative";
	const toUpdate = {unread: unread};
	const userCollection = await users();
	const user = await userCollection.findOne({ _id: uid });
	if (!user) throw "Error: There is no user with the given name";
	if (noti_str) {
		console.log(uid, noti_str)
		if (!Array.isArray(noti_str)) throw "Error: Notifications must be an array";
		const notiArr = user.noti.noti_str;
		notiArr.push(...noti_str);
		toUpdate.noti_str = notiArr;
	} else toUpdate.noti_str = user.noti.noti_str;
	// console.log("updating notifications: ", toUpdate);
	const updatedUser = await userCollection.findOneAndUpdate(
		{ _id: uid },
		{ $set: { noti: toUpdate } },
		{ returnDocument: "after" }
	);
	if (!updatedUser) {
		throw `Error: User with id ${uid} not found`;
	}
	return updatedUser.noti;
};

const getUserByUsername = async (username) => {
	// username = username.toLowerCase();
	const userCollection = await users();
	const user = await userCollection.findOne({ username: username });
	if (!user) throw "Error: There is no user with the given name";
	return user;
};

const getTherapistByName = async (name) => {
	const splitName = name.split(" ");
	const first = splitName[0];
	const last = splitName[1];
	const userCollection = await users();
	const user = await userCollection. findOne({isTherapist: true, firstName: first, lastName: last});
	if(!user) throw "Error: There is no user by that first and last name";
	return user;
}

const getAllTherapists = async (type) => {
	const personalSpecialty = ["Relationship with Yourself", "Relationship with Others", "Personal and Professional development", "New Living Conditions"];
	const coupleSpecialty = ["Difficulty in communication, crisis", "Intimate Relations", "Breakup", "Emotional abuse, abusive behavior", "Child-rearing practices", "Betrayal"];
	const childrenSpecialty = ["ADHD (Attention Deficit Hyperactivity Disorder)", "Excessive Aggression", "Children with Special Needs", "Loss of Loved Ones", "Adaptation", "Bullying"];
	if(type === 'personal'){
		const userCollection = await users();
		const therapistCollection = await userCollection
			.find({ isTherapist: true, specialty: {$in :personalSpecialty}})
			.toArray();
		return therapistCollection;

	}
	if(type === 'couple'){
		const userCollection = await users();
		const therapistCollection = await userCollection
			.find({ isTherapist: true, specialty: {$in :coupleSpecialty}})
			.toArray();
		return therapistCollection;
	}
	if(type === 'children'){
		const userCollection = await users();
		const therapistCollection = await userCollection
			.find({ isTherapist: true, specialty: {$in: childrenSpecialty}})
			.toArray();
		return therapistCollection;
	}
	else {
		const userCollection = await users();
		const therapistCollection = await userCollection
			.find({isTherapist : true})
			.toArray();
		return therapistCollection;
	}
};

const getAllPatients = async () => {
	const userCollection = await users();
	const patientCollection = await userCollection
		.find({ isTherapist: false })
		.toArray();
	return patientCollection;
};

const getTherapistPatients = async (id) => {
	const chatCollection = await chats();

	const therapistData = await getUserById(id);
	const patientList = therapistData.patients;
	// console.log(patientList)
	let nameList = [];
	for (let i = 0; i < patientList.length; i++){
		let patientData = await getUserById(patientList[i]);
		console.log(id, patientList[i])
		let chatExists = await chatCollection.findOne(
			{
				user1_id: id,
				user2_id: patientList[i]
			}
		)
		if (!chatExists){
			chatExists = await chatCollection.findOne(
				{
					user1_id: patientList[i],
					user2_id: id
				}
			)
		}
		let chatID = chatExists._id;
		nameList.push(
			{
				_id: patientList[i],
				name: patientData.firstName + " " + patientData.lastName,
				chatID: chatID
			}
		);
	}
	console.log(nameList)
	return nameList
};

const getFilteredTherapists = async(filters) => {
	let selectedPrice = '';
	let selectedGender = '';
	let selectedOrder= '';
	let selectedType = '';
	const userCollection = await users();
	let therapistCollection;
	for(let key in filters) {
		if(filters[key] == ""){
			delete filters[key];
		}
		else{
			if(key ==='price'){
				selectedPrice = filters[key];
				delete filters[key];
			}
			if(key ==='gender'){
				selectedGender= filters[key];
				delete filters[key];
			}
			if(key ==='sort'){
				selectedOrder = filters[key];
				delete filters[key];
			}
			if(key ==='type'){
				selectedType = filters[key];
				delete filters[key];
			}
		}
	}
	const valuesToCheck = Object.values(filters);
	// console.log(valuesToCheck.length);
	if(valuesToCheck.length == 0 && filters.constructor === Object && selectedPrice == '' && selectedGender == ''){
		// console.log('here1');
		therapistCollection = await getAllTherapists(selectedType);
	}
	if(valuesToCheck.length != 0){
		if(selectedGender == '' && selectedPrice != '') {
			therapistCollection = await userCollection
			.find({isTherapist: true, specialty : {$in: valuesToCheck}, price : selectedPrice})
			.toArray();

		}
		else if(selectedGender != '' && selectedPrice == ''){
			// console.log(selectedGender);
			therapistCollection = await userCollection
			.find({isTherapist: true, specialty : {$in: valuesToCheck}, gender: selectedGender})
			.toArray();
			
		}
		else if(selectedGender != '' && selectedPrice != ''){
			// console.log('here4');
			therapistCollection = await userCollection
			.find({isTherapist: true, specialty : {$in: valuesToCheck}, gender: selectedGender, price: selectedPrice})
			.toArray();
			
		}
		else {
			// console.log('here5');
			therapistCollection = await userCollection
			.find({isTherapist: true, specialty : {$in: valuesToCheck}})
			.toArray();
			
		}
	}

	else{

		if(selectedGender == '' && selectedPrice != ''){
			// console.log('here6');
			therapistCollection = await getAllTherapists(selectedType);
			therapistCollection = therapistCollection.filter(value => value.price == selectedPrice);
		}
		
		else if(selectedGender != '' && selectedPrice == ''){
			// console.log('here7');
			therapistCollection = await getAllTherapists(selectedType);
			therapistCollection = therapistCollection.filter(value => value.gender == selectedGender);
			
		}
		else if(selectedGender != '' && selectedPrice != ''){
			// console.log('here8');
			therapistCollection = await getAllTherapists(selectedType);
			therapistCollection = therapistCollection.filter(value => value.gender == selectedGender && value.price == selectedPrice);
		}
	}
	
	if(selectedOrder == "first_name_order"){
		// console.log('here9');
		return therapistCollection.sort((a, b) => (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? 1 : ((b.firstName.toLowerCase() > a.firstName. toLowerCase()) ? -1: 0))
	}
	if(selectedOrder == "last_name_order")  {
		// console.log('here10');
		return therapistCollection.sort((a, b) => (a.lastName.toLowerCase() > b.lastName.toLowerCase()) ? 1 : ((b.lastName.toLowerCase() > a.lastName.toLowerCase()) ? -1: 0))
	}
	else return therapistCollection
}

// Matching

const checkUserifTherapist = async (userID) => {
	const userCollection = await users();
	const currentUser = await getUserById(userID);
	if (currentUser.isTherapist == true){
		console.log("User is Therapist")
		return true;
	}
	console.log("User is NOT Therapist")
	return false;
};


const match = async (currentUserID, TherapistID) => {
  const userCollection = await users();
  const currentUser = await getUserById(currentUserID);
  const Therapist = await getUserById(TherapistID);


  // Patient
  if (currentUser.isTherapist != true){
    // console.log(" BOTH Patient and Therapist Exist and Current User not Therapist")


   
    const user = await userCollection.findOne({ _id: currentUserID });
    const prevTherapistID = user.therapist;


    //Update for user
    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: currentUserID },
      { $set: { therapist: TherapistID  } }
    );
 
    //update for therapist
    if (!Therapist.patients.includes(currentUserID)) {
      const updatedTherapist = await userCollection.findOneAndUpdate(
        { _id: TherapistID },
        { $push: { patients: currentUserID  } }
      );


    //delete from the previous therapist
    await userCollection.findOneAndUpdate(
      { _id: prevTherapistID },
      { $pull: { patients: currentUserID  } }
    );
    //delete all meetings with previous therapist
    const meetingCollection = await meetings();
    await meetingCollection.deleteMany({patient: currentUserID, therapist:prevTherapistID});




    }
    //already matched call unmatch
    else{
      // console.log("User already matched with therapist  " + currentUser.therapist);
     
      // console.log("Therapist should be removed from patient" + currentUser.therapist)
      const updatedUser = await userCollection.findOneAndUpdate(
        { _id: currentUserID },
        { $set: { therapist: null  } }
      );
      const updatedTherapist = await userCollection.findOneAndUpdate(
        { _id: TherapistID },
        { $pull: { patients: currentUserID  } }
      );
      // console.log("Patient should be removed from therapist" + currentUser.therapist)
 
      //cancel all meetings
      const meetingCollection = await meetings();
      await meetingCollection.deleteMany({patient: currentUserID, therapist:TherapistID});


      return currentUser;
    }
  }
  // Therapist needs to confirm on their side later
  else {
    throw" therapist account can't match/unmatch with a patient (to be done)"
  }
}


// Chat
const getTherapistByPatientID = async (patientid) => {
	const userCollection = await users();
	const user = await userCollection. findOne({_id: patientid});
	if(!user) throw "Error: There is no user with patientID";
	if (user.therapist == null){
		throw 'Patient is not matched with Therapist'
	}
	return user.therapist;
}
const getPatientbyTherapistID = async (therapistid) => {
	const userCollection = await users();
	const user = await userCollection. findOne({_id: therapistid});
	if(!user) throw "Error: There is no therapist";
	if (user.patients == null || user.patients.length === 0){
		throw 'Error therapist has no patients'
	}
	return user.patients;
}



module.exports = {
  createUser,
  updateUserInfo,
  getUserById,
  emptyUploadsFolder,
  saveImgToDB,
  savePdfToDB,
  getPdfFromDB,
  deletePdfFromDB,
	getNotifications,
	updateNotifications,
	updateProfile,
	getUserByUsername,
	getAllTherapists,
	getAllPatients,
	getFilteredTherapists,
	getTherapistByName,
	gettingStarted,
  match,
  checkUserifTherapist,
  getPatientbyTherapistID,
  getTherapistByPatientID,
	getTherapistPatients,
};
