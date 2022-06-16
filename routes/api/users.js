const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Userdata = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

//@route     POST api/users
//@desc      Register User
//@access    Public
router.post(
	"/",
	[
		check("name").not().isEmpty().withMessage("Name is required."),
		check("email")
			.not()
			.isEmpty()
			.withMessage("Email is required")
			.isEmail()
			.withMessage("Email address is not valid."),
		check("password")
			.isLength({ min: 5 })
			.withMessage("Password with minium length of 5 is required."),
	],
	async (req, res) => {
		//Checking for valid input fields with express-validator
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//Destructuring fields from request body
		const { name, email, password } = req.body;

		try {
			const user = await Userdata.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "User already exists." }] });
			}

			//encrypt password
			const salt = await bcrypt.genSalt(8);
			const hash = await bcrypt.hash(password, salt);

			const userobj = new Userdata({
				username: name,
				email,
				password: hash,
			});

			const userdata = await userobj.save();

			//send JSONwebtoken in response omce user is saved in database
			const secretkay = config.get("secretkay");
			jwt.sign(
				{ email: userdata.email },
				secretkay,
				{
					expiresIn: 360000,
				},
				(error, token) => {
					if (error) {
						throw error;
					} else {
						res.json({ token });
					}
				}
			);
		} catch (error) {
			console.log(error);
			res.status(500).send("Server Error");
		}
	}
);

//@route     GET api/users
//@desc      Get User List
//@access    Private, Admin
router.get("/", auth, admin, async (req, res) => {
	try {
		const users = await Userdata.find().select("-password");
		if (!users) {
			return res.status(400).json({ errors: [{ msg: "No User found." }] });
		}

		res.send(users);
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

//@route     POST api/users/:id
//@desc      Update userrole with user_id 
//@access    Private, Admin
router.post("/:id", auth, admin, async (req, res) => {
	try {
		const users = await Userdata.findOneAndUpdate({_id: req.params.id },{ role: "mod" }).select("-password");
		if (!users) {
			return res.status(400).json({ errors: [{ msg: "No User found." }] });
		}

		res.send({msg:"User role is updated."});
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});


//@route     DELETE api/users/:id
//@desc      Delete user with user_id 
//@access    Private, Admin
router.delete("/:id", auth, admin, async (req, res) => {
	try {
		const users = await Userdata.findOneAndDelete({_id: req.params.id });
		if (!users) {
			return res.status(400).json({ errors: [{ msg: "No User found." }] });
		}

		res.send({msg:"User is deleted."});
	} catch (error) {
		console.log(error);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
