const express = require("express");
const app = express();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

//connect to database
connectDB();

app.use(express.json());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/complaint", require("./routes/api/complaint"));
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
	console.log(`Server is running at port : ${PORT}`);
});
