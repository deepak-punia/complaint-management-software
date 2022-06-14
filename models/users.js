const mongoose = require("mongoose");
const config = require("config");
const ROLE_USER = config.get("ROLE.USER");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	role: {
		type: String,
		default: ROLE_USER,
	}
});

const Userdata = mongoose.model("userdata", UserSchema);

module.exports = Userdata;