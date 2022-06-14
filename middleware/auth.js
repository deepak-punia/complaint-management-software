const express = require("express");
const jwt = require("jsonwebtoken");
const Userdata = require("../models/users");
const config = require("config");

const auth = async (req, res, next) => {
	const token = req.header("x-auth-token");

	//handling error
	//if no token is sent
	if (!token) {
		return res.status(401).json({ msg: "No token, Access denied" });
	}
    //decoding token
	try {
		const secretkay = config.get("secretkay");
		var decoded = jwt.verify(token, secretkay);
		req.user = decoded.email;
		next();
	} catch (err) {
		return res.status(401).json({ msg: "Invalid Token, Access denied" });
	}
};

module.exports = auth;