const sql = require("../connection");
const express = require("express");
const router = express.Router();
const shortid = require("shortid");

//API request to get user data
router.get("/api/getUser", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(400).send({ err: " Please Provide ID" });
    } else {
      await sql.query(
        `select * from users where userId = ${id}`,
        (err, data) => {
          if (err) {
            res.status(400).send({ err: "Error while excuting query" });
          } else if (!data[0]) {
            res.status(404).send({ err: "Invalid User. Data not found" });
          } else {
            res.status(200).send({ message: data });
          }
        }
      );
    }
  } catch (error) {
    res.status(400).send({ err: "Something went wrong! Try Again" });
  }
});

//API request to login user
router.get("/api/loginUser", async (req, res) => {
  try {
    const { email, pass } = req.query;
    if (!email || !pass) {
      res.status(400).send({ err: "Please provide email and password" });
    } else {
      await sql.query(
        `select email,password from users where email = '${email}'`,
        (err, data) => {
          if (err) {
            res.status(400).send({ err: "Something went wrong!" });
          } else if (!data[0]) {
            console.log(data);
            res.status(404).send({ err: "User not found" });
          } else {
            console.log(data[0].email, data[0].password, pass);
            if (data[0].password === pass) {
              res.status(200).send({ message: "Login Successfully" });
            } else {
              res.status(400).send({ err: "Inncorrect Password! Try again" });
            }
          }
        }
      );
    }
  } catch (error) {
    res.status(400).send({ err: "Something went wrong! Try Again" });
  }
});

//API to register new user
router.post("/api/registerUser", async (req, res) => {
  try {
    const { name, phnNo, email, password, age, gender } = req.body;
    if (!name || !phnNo || !email || !password || !age || !gender) {
      res.status(400).send({ err: "Please provide all details" });
    } else {
      const id = shortid.generate();
      console.log(id, name, phnNo, email, password, age, gender);
      await sql.query(
        `insert into users values('${id}','${name}','${phnNo}','${email}','${password}','${age}','${gender}')`,
        (err, data) => {
          if (err) {
            res.status(400).send({ err: "Something went wrong!" });
          } else if (data.affectedRows === 1) {
            res.status(200).send({ message: "User registered successfully" });
          } else {
            res.status(400).send({ err: "Registration Failed! Try Again" });
          }
        }
      );
    }
  } catch (error) {
    res.status(400).send({ err: "Something went wrong! Try again" });
  }
});

//API to delete user
router.delete("/api/deleteUser", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(400).send({ err: "Please provide the User ID to be deleted" });
    } else {
      await sql.query(
        `delete from users where userId = '${id}'`,
        (err, data) => {
          if (err) {
            res.status(400).send({ err: "Something went wrong" });
          } else if (data.affectedRows === 1) {
            res.status(200).send({ message: "User deleted successfully" });
          } else {
            res.status(400).send({ err: "User could not be deleted" });
          }
        }
      );
    }
  } catch (error) {
    res.send(400).send({ err: "Something went wrong! Try Again" });
  }
});
module.exports = router;
