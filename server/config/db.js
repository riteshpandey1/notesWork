const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_task",
});

db.connect((err) => {
  if (err) {
    console.log("error" + err);
  } else {
    console.log("connection created");
  }
});

module.exports = db;
