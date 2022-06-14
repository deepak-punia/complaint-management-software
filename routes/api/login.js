const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Userdata = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require('../../middleware/auth');

//@route     GET api/login
//@desc      Get logged in user data
//@access    Private
router.get("/", auth, async (req, res) => {
	try {
		const user = await Userdata.findOne({email:req.user}).select("-password");
		
        res.json(user);
        
	} catch (err) {
		res.status(500).send("Server Error");
	}
});

//@route     POST api/login
//@desc      Login User
//@access    Public
router.post(
	"/",
	[
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
		const { email, password } = req.body;

		try {
			const user = await Userdata.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Email is not valid" }] });
			}

			//validate password
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
			}

			//send JSONwebtoken in response once user is validated
			const secretkay = config.get("secretkay");
			jwt.sign(
				{ email: user.email },
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

module.exports = router;