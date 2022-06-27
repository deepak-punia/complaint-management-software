const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

app.use(
	cors({
		origin: "*",
	})
);

const PORT = process.env.PORT || 5000;

//connect to database
connectDB();

app.use(express.json());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/complaint", require("./routes/api/complaint"));
app.use("/uploads", express.static("uploads"));

//serve static assests in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running at port : ${PORT}`);
});
