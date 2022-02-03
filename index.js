const express = require("express");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const uri = "mongodb+srv://izac:izacpeterson@cluster0.kewyg.mongodb.net/mtech?retryWrites=true&w=majority";

mongoose.connect(uri);

const PORT = process.env.PORT || 3000;

//Schema
const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  email: String,
  age: Number,
});

const user = mongoose.model("User", userSchema);

//Servers html pages
app.use("/newUser", express.static("views/newUser"));
app.use("/", express.static("views/allUser"));
app.use("/editUser", express.static("views/editUser"));
app.use(express.json());

//Get all users
app.get("/getAllUsers", (req, res) => {
  user.find({}, {}, {}, (err, data) => {
    res.send(data);
  });
});

//Get a single users, by ID
app.get("/getUser", (req, res) => {
  let id = req.query.id;
  user.find({ _id: id }, {}, {}, (err, data) => {
    res.send(data);
  });
});

//Updates a signle user, found by ID
app.post("/updateUser", (req, res) => {
  let newUser = req.body;
  console.log(newUser.id);
  user.updateOne({ _id: newUser.id }, { age: newUser.age, first: newUser.first, last: newUser.last, email: newUser.email }, {}, (err, data) => {
    if (err) console.log(err);
    res.send("request received");
  });
});

//Adds a new user
app.post("/newUser", (req, res) => {
  const newUser = new user();

  newUser.first = req.body.first;
  newUser.last = req.body.last;
  newUser.email = req.body.email;
  newUser.age = req.body.age;

  newUser.save((err, data) => {
    if (err) console.log(err);
    console.log(data);
  });

  res.send("request received");
});

//Delete a user
app.get("/deleteUser", (req, res) => {
  user.deleteOne({ _id: req.query.id }, {}, (err, data) => {
    if (err) console.log(err);

    console.log(data);
  });

  res.redirect("/");
});

//Server listening
app.listen(PORT, () => {
  console.log("Server listening on 3000");
});
