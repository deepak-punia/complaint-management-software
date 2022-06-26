const express = require("express");
const path = require("path");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Complaint = require("../../models/complaints");
const Userdata = require("../../models/users");
const config = require("config");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join("./uploads"));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix =
			Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
		cb(null, file.fieldname + "-" + uniqueSuffix);
	},
});

const upload = multer({ storage: storage });

//@route     POST api/complaint
//@desc      Create a complaint
//@access    Private
router.post("/", auth, upload.single("complaint"), async (req, res) => {
	//Destructuring fields from request body
	const title = req.body.title;
	const details = req.body.details;
	const priority = req.body.priority;

	try {
		const user = await Userdata.findOne({ email: req.user });
		if (!user) {
			return res
				.status(400)
				.json({ errors: [{ msg: "Inalid User! Please Login." }] });
		}

		let imgUrl;
		if(req.file){
			imgUrl= req.file.path
		}else{
			imgUrl= undefined
		}

		const imagesdata = {
			url: imgUrl
		}
		const complaintobj = new Complaint({
			user_id: user._id,
			priority: priority,
			details: details,
			title: title,
			username: user.username,
			imagesdata: imagesdata,
		});

		const complaintdata = await complaintobj.save();
		res.json(complaintdata);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

//@route     GET api/complaints
//@desc      Get all complaints for admin
//@access    Private , admin
router.get("/", auth,  async (req, res) => {
	try {
		const complaints = await Complaint.find();
		if (!complaints) {
			return res.status(400).json({ errors: [{ msg: "No complaints." }] });
		}

		res.json(complaints);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

//@route     GET api/complaints/usercomplaints
//@desc      Get all complaints for logged in user
//@access    Private
router.get("/usercomplaints", auth, async (req, res) => {
	try {
		const user = await Userdata.findOne({ email: req.user });
		if (!user) {
			return res
				.status(400)
				.json({ errors: [{ msg: "Inalid User! Please Login." }] });
		}

		const complaints = await Complaint.find({ user_id: user._id });
		if (!complaints) {
			return res.status(400).json({ errors: [{ msg: "No complaints." }] });
		}

		res.json(complaints);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

//@route     GET api/complaints/id
//@desc      Get complaint with id
//@access    Private
router.get("/:id", auth, async (req, res) => {
	try {
		const complaints = await Complaint.findOne({ _id: req.params.id });
		if (!complaints) {
			return res.status(400).json({ errors: [{ msg: "No complaint found." }] });
		}

		res.json(complaints);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

//@route     POST api/complaints/id
//@desc      add reply to complaint with id
//@access    Private
router.post("/:id", auth, upload.single("reply"), async (req, res) => {
	const reply = req.body.replymsg;
	try {
		const user = await Userdata.findOne({ email: req.user });
		if (!user) {
			return res
				.status(400)
				.json({ errors: [{ msg: "Inalid User! Please Login." }] });
		}

		let imgUrl;
		if(req.file){
			imgUrl= req.file.path
		}else{
			imgUrl= null
		}

		const imagesdata = {
			url: imgUrl
		}

		const replyobj = {
			user_id: user._id,
			reply: reply,
			username: user.username,
			userrole: user.role,
			imagesdata: imagesdata,
		};

		const complaints = await Complaint.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$push: {
					replies: replyobj,
				},
			}
		);
		if (!complaints) {
			return res.status(400).json({ errors: [{ msg: "No complaint found." }] });
		}

		res.json({ msg: "added" });
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

//@route     POST api/complaints/status
//@desc      Change status of complaint with id
//@access    Private
router.post("/status/:id", auth, async (req, res) => {
	try {
		const complaints = await Complaint.findOneAndUpdate(
			{ _id: req.params.id },
			{ status: "resolved" }
		);
		if (!complaints) {
			return res.status(400).json({ errors: [{ msg: "No complaint found." }] });
		}

		res.json({ msg: "Complaint status is changed to resolved." });
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

//@route     GET api/complaints/user/id
//@desc      Get all complaints for user with user id
//@access    Private
router.get("/user/:id", auth, async (req, res) => {
	try {
		const complaints = await Complaint.find({ user_id: req.params.id });
		if (!complaints) {
			return res.status(400).json({ errors: [{ msg: "No complaint found." }] });
		}

		res.json(complaints);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
