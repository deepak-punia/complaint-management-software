const mongoose = require("mongoose");

const ImagesSchema = new mongoose.Schema({
	url: {
		type: String,
		default: null
	}
});

const RepliesSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'userdata'
	},
    username: {
		type: String,
	},
	reply: {
		type: String,
	},
    userrole: {
		type: String,
	},
    imagesdata: [ImagesSchema]
    
});

const ComplaintSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'userdata',
	},
	replies: [RepliesSchema],
    status:{
        type: String,
		default: "pending"
    },
    priority:{
        type: String,
		required: true,
    },
    title:{
        type: String,
		required: true,
    },
	details:{
        type: String,
		required: true,
    },
    username:{
        type: String,
		required: true,
    },
    imagesdata:[ImagesSchema],
	date: {
		type: Date,
		default: Date.now,
	}
});

const Complaint = mongoose.model("complaint", ComplaintSchema);

module.exports = Complaint;