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
		specialty: [],
		pdf_files: [],
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
	fs.writeFileSync(tempFilePath, user.pdf_files[index].content);

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

const getUserByUsername = async (username) => {
	username = username.toLowerCase();
	const userCollection = await users();
	const user = await userCollection.findOne({ username: username });
	if (!user) throw "Error: There is no user with the given name";
	return user;
};

const getAllTherapists = async () => {
	const userCollection = await users();
	const therapistCollection = await userCollection
		.find({ isTherapist: true })
		.toArray();
	return therapistCollection;
};

const getFilteredTherapists = async(filters) => {
	let selectedPrice = '';
	let selectedGender = '';
	let selectedOrder= '';
	const userCollection = await users();
	let therapistCollection;
	// console.log(filters);
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
		}
	}
	const valuesToCheck = Object.values(filters);
	// console.log(valuesToCheck.length);
	if(valuesToCheck.length == 0 && filters.constructor === Object && selectedPrice == '' && selectedGender == ''){
		// console.log('here1');
		therapistCollection = await getAllTherapists();
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
			therapistCollection = await userCollection
			.find({isTherapist: true, price : selectedPrice})
			.toArray();
			
		}
		
		else if(selectedGender != '' && selectedPrice == ''){
			// console.log('here7');
			therapistCollection = await userCollection
			.find({isTherapist: true, gender : selectedGender})
			.toArray();
			
		}
		else if(selectedGender != '' && selectedPrice != ''){
			// console.log('here8');
			therapistCollection = await userCollection
			.find({isTherapist: true, gender : selectedGender, price: selectedPrice})
			.toArray();
		}
	}
	
	if(selectedOrder == "first_name_order"){
		// console.log('here9');
		return therapistCollection.sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1: 0))
	}
	if(selectedOrder == "last_name_order")  {
		// console.log('here10');
		return therapistCollection.sort((a, b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1: 0))
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
  emptyUploadsFolder,
  saveImgToDB,
  savePdfToDB,
  getPdfFromDB,
  deletePdfFromDB,
	updateProfile,
	getUserByUsername,
	getAllTherapists,
	getFilteredTherapists,
	gettingStarted,
  match,
  checkUserifTherapist,
};
