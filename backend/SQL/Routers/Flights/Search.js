const sql = require("../connection");
const express = require("express");
const router = express.Router();

//API to get flight details on particular date and location -- Search Result
router.get("/api/getFlights", async (req, res) => {
  try {
    const { fromCity, toCity, flDate } = req.query;
    if (!fromCity || !toCity || !flDate) {
      res.status(400).send({ err: "Please enter the necessary details" });
    } else {
      await sql.query(
        `select * from flights where LOWER(fromCity) = '${fromCity}' and LOWER(toCity) = '${toCity}' and flDate ='${flDate}'`,
        (err, data) => {
          if (err) {
            res.status(400).send({ err: "Something went wrong" });
          } else if (!data[0]) {
            res.status(404).send({ err: "No flights found!" });
          } else {
            res.status(200).send({ message: data });
          }
        }
      );
    }
  } catch (error) {
    res.status(400).send({ err: "Something went wrong! Try again" });
  }
});

//API to add new flight
router.post("/api/addFlight", async (req, res) => {
  try {
    const {
      flNo,
      flName,
      boardPoint,
      destPoint,
      boardTime,
      destTime,
      price,
      totSeats,
      bookedSeats,
    } = req.body;
  } catch (error) {
    res.status(400).send({ err: "something went wrong! Try again" });
  }
});
module.exports = router;
