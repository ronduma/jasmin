const express = require("express");
const router = express.Router();
// const helpers = require("../helpers");
const users = require("../data/users");
const path = require("path");
const xss = require("xss");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get("/:id", async (req, res) => {
	try {
		const userObject = await users.getUserById(req.params.id);
		console.log("user:", userObject);
		return res.status(200).json(userObject);
	} catch (e) {
		console.log(e);
		return res.status(400).json(e);
	}
});

router.put("/", async (req, res) => {
	try {
		let user = await users.updateUserInfo(req.body);
		return res.status(200).json(user);
	} catch (e) {
		console.log(e);
		return res.status(400).json(e);
	}
});

router.put("/getting-started", async (req, res) => {
	try {
		let user = await users.gettingStarted(req.body);
		return res.status(200).json(user);
	} catch (e) {
		console.log(e);
		return res.status(400).json(e);
	}
});

router.put("/:id/profile-pic", upload.single("file"), async (req, res) => {
	const file = req.file;
	if (!file) {
		return res.status(400).json({ error: "No image file uploaded" });
	}
	if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
		return res
			.status(400)
			.json({ error: "Please upload a valid image file (jpg or png)" });
	}
	console.log("saving file to /uploads");
	await users.saveImgToDB(req.params.id, file.path);
	return res.status(200).json("");
});

router.put("/therapist", async (req, res) => {
	try {
		let user = await users.updateUserInfo(req.body);
		return res.status(200).json(user);
	} catch (e) {
		console.log(e);
		return res.status(400).json(e);
	}
});

router.put("/bio", async (req, res) => {
	try {
		let bio = xss(req.body.bio);
		let uid = req.body.uid;
		let bioReturn = await users.updateProfile(uid, { bio: bio });
		return res.status(200).json(bioReturn);
	} catch (e) {
		console.log(e);
		return res.status(400).json(e);
	}
});

router.put("/concerns", async (req, res) => {
	try {
		let uid = req.body.uid;
		if (req.body.concerns.length !== 3) throw "Not three concerns";
		const concerns = [];
		for (let i = 0; i < 3; i++) {
			concerns.push(xss(req.body.concerns[i]));
		}
		if (concerns[0] === "" && concerns[1] === "" && concerns[2] === "")
			throw "No concerns";
		const concernsReturn = await users.updateProfile(uid, {
			concerns: concerns,
		});
		return res.status(200).json(concernsReturn);
	} catch (e) {
		console.log(e);
		return res.status(400).json(e);
	}
});

router.put("/specialty", async (req, res) => {
	try {
		let uid = req.body.uid;
		const specialty = [];
		for (let i = 0; i < req.body.specialty.length; i++) {
			specialty.push(xss(req.body.specialty[i]));
		}
		const specialtyReturn = await users.updateProfile(uid, {
			specialty: specialty,
		});
		return res.status(200).json(specialtyReturn);
	} catch (e) {
		console.log(e);
		return res.status(400).json(e);
	}
});
router.put("/price", async (req, res) => {
	try{
		let uid = req.body.uid;
		console.log('bruh');
		console.log(req.body.price);
		const priceReturn = await users.updateProfile(uid,  {
			price: req.body.price
		})
		return res.status(200).json(priceReturn);
	}
	catch(e){
		console.log(e);
		return res.status(400).json(e);
	}
});

router.put("/:id/upload-pdf", upload.single("file"), async (req, res) => {
	const id = req.params.id;
	const file = req.file;
	if (!file) {
		return res.status(400).json({ error: "No pdf" });
	}
	if (!file.originalname.match(/\.(pdf)$/)) {
		return res
			.status(400)
			.json({ error: "Please upload a valid pdf file (.pdf)" });
	}
	console.log("saving file to /uploads");
	await users.savePdfToDB(id, file.path, file.originalname);
	return res.status(200).json("");
});

router.get(":id/download-pdf/:index", async (req, res) => {
	const id = req.params.id;
	const index = req.params.index;
	const pdfPath = await users.getPdfFromDB(id, index);
	res.download(pdfPath, (err) => {
	  if (err) {
		console.error(err);
	  }
	  fs.unlinkSync(pdfPath); // Delete the temporary file
	});
  });

router.delete(":id/delete-pdf/:index", async (req, res) => {
	const id = req.params.id;
	const index = req.params.index;
	await users.deletePdf(id, index);
	return res.status(200).json("");
});

module.exports = router;