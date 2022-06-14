const express = require("express");
const jwt = require("jsonwebtoken");
const Userdata = require("../models/users");
const config = require("config");

const mod = async (req, res, next) => {
	
	try {
		
        const user = await Userdata.findOne({email:req.user}).select("-password");
        if(user.role !== config.get("ROLE.MOD")){
            throw new Error;
        }
		next();
	} catch (err) {
		return res.status(401).json({ msg: "Only Moderators can access this API, Access denied" });
	}
};

module.exports = mod;