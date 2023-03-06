const express = require("express");
const app = express();

const db = require("./config/db");
const cors = require("cors");

const PORT = 8000;

app.use(cors());
app.use(express.json());

// Route to add all notes using post method

app.post("/add-notes", (req, res) => {
  const data = req.body;
  db.query("insert into datanotes set ?", data, (error, result) => {
    if (error) {
      console.log(`error come ${error}`);
    } else {
      res.send(result);
    }
  });
});

// Route to get all notes using get method

app.get("/get-notes", (req, res) => {
  db.query("select * from datanotes", (error, result) => {
    if (error) {
      res.send({ msg: "no result found" });
    } else {
      res.send(result);
    }
  });
});

// Route to delete notes using delete method

app.delete("/delete-notes/:id", async (req, res) => {
  // res.send(req.params.id);
  db.query(
    `delete from datanotes where id = ${req.params.id}`,
    (error, result) => {
      if (error) {
        res.send({ msg: "delete data problem" });
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
