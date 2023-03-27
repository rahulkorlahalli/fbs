const mysql = require("mysql");

const sql = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

sql.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("--Connection established with Database--");
  }
});

module.exports = sql;
