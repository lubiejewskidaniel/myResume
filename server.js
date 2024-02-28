const express = require("express");
const app = express();

let visitsCount = 0;

app.get("/get-visits-count", (req, res) => {
	res.json({ count: visitsCount });
});

app.use((req, res, next) => {
	visitsCount++;
	next();
});

app.listen(5500, () => {
	console.log("Server is running on port 5500");
});
