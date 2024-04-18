const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const fs = require("fs");

const validation = require("./validation");

const createUser = async (uid, email) => {
	const userCollection = await users();
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
		specialty: []
	};
	const insertInfo = await userCollection.insertOne(user);
	if (!insertInfo.acknowledged || !insertInfo.insertedId) {
		throw "Could not add user";
	}
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
	console.log(validation.validateUserUpdate(updated));
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

const getUserByUsername = async (username) => {
	// username = username.toLowerCase();
	const userCollection = await users();
	const user = await userCollection.findOne({ username: username });
	if (!user) throw "Error: There is no user with the given name";
	return user;
};

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
    console.log(" BOTH Patient and Therapist Exist and Current User not Therapist")

    //add patient if its not in therapist acc
    if ((!Therapist.patients.includes(currentUserID)) && (currentUser.therapist == null || currentUser.therapist == "") ) {
      const updatedTherapist = await userCollection.findOneAndUpdate(
        { _id: TherapistID },
        { $push: { patients: currentUserID  } }
      );

      console.log("Patient should be added to therapist" + Therapist.patients)

        //Update current user to add therapist
      const updatedUser = await userCollection.findOneAndUpdate(
        { _id: currentUserID },
        { $set: { therapist: TherapistID  } }
      );
      console.log("Therapist should be added to patient" + currentUser.therapist)
      return currentUser;
    }
    //already matched call unmatch
    else{
      console.log("User already matched with therapist  " + currentUser.therapist);


      console.log("Therapist should be removed from patient" + currentUser.therapist)
      const updatedUser = await userCollection.findOneAndUpdate(
        { _id: currentUserID },
        { $set: { therapist: null  } }
      );
      const updatedTherapist = await userCollection.findOneAndUpdate(
        { _id: TherapistID },
        { $pull: { patients: currentUserID  } }
      );
      console.log("Patient should be removed from therapist" + currentUser.therapist)
		

      return currentUser;
    }
  }
  // Therapist needs to confirm on their side later
  else {
    throw" 'THERAPIST Acc can't match with a patient '"
  }
}



const unMatch = async (currentUserID, TherapistID) => {
  return;
}



module.exports = {
  createUser,
  updateUserInfo,
  getUserById,
  saveImgToDB,
	updateProfile,
	getUserByUsername,
	getAllTherapists,
	getFilteredTherapists,
	gettingStarted,
  match,
  checkUserifTherapist,
};
