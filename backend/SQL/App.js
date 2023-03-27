require("dotenv").config({ path: `../config/.env.SQL` });
const express = require("express");
const login = require("./Routers/Login/login.js");
const search = require("./Routers/Flights/Search.js");
const app = express();
const PORT = process.env.PORT || 5000;

/*
express.json() is a built in middleware function in Express starting from v4.16.0. 
It parses incoming JSON requests and puts the parsed data in req.body.
*/
app.use(express.json());
app.use(login);
app.use(search);

app.listen(PORT, () => {
  console.log("--Server started on port: " + PORT);
});
