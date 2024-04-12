const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const fs = require("fs");
const dayjs = require("dayjs");

const validation = require("./validation");

const createUser = async (uid, email) => {
	const userCollection = await users();
	const userExists = await userCollection.findOne({ uid: uid });
	if (userExists) {
		throw "User with email already exists.";
	}

	const kaiChat = {
		to: {
			id: "0",
			name: "kAI"
		},
		messages: [
			{
				from: "kAI",
				message: "Hello! I'm kAI, your personal AI assistant. Let me know if you have any questions about Jasmin.",
				timestamp: dayjs().format('DD-MM-YYYY HH:mm:ss')
			}
		]
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
		chatLog: [kaiChat],
		patients: [],
		therapist: null,
		specialty: []
	};

	console.log("inserting user:", user)

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
	console.log('here');
	console.log(filters);
	
}

// Matching

const match = async (currentUserID, TherapistID) => {
  const userCollection = await users();
  const currentUser = await getUserById(currentUserID);
  const Therapist = await getUserById(TherapistID);

  // Patient 
  if (currentUser.isTherapist != true){
    console.log(" BOTH Patient and Therapist Exist and Current User not Therapist")

    //Update
    const updatedUser = await userCollection.findOneAndUpdate(
			{ _id: currentUserID },
			{ $set: { therapist: TherapistID  } }
		);
  
    if (!Therapist.patients.includes(currentUserID)) {
      const updatedTherapist = await userCollection.findOneAndUpdate(
        { _id: TherapistID },
        { $push: { patients: TherapistID  } }
      );
      console.log("Patient should be added to therapist" + Therapist.patients)
    }
    else {
      console.log("Therapist already in database")
    }
  }
  // Therapist needs to confirm on their side later
  else {
    if (!Therapist.patients.includes(currentUserID)) {
      Therapist.patients.push(currentUserID);
      console.log("Patient should be added to therapist" + Therapist.patients)
    }
  }

  return currentUser;
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
};
