const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

//Servers html pages
app.use("/newUser", express.static("views/newUser"));
app.use("/", express.static("views/allUser"));
app.use("/editUser", express.static("views/editUser"));
app.use(express.json());

//Get all users
app.get("/getAllUsers", (req, res) => {
  let users = fs.readFileSync("./data/users.json");
  res.send(users.toString());
});

//Get a single users, by ID
app.get("/getUser", (req, res) => {
  let id = req.query.id;
  let users = fs.readFileSync("./data/users.json");
  users = users.toString();
  users = JSON.parse(users);
  res.send(users[id - 1]);
});

//Updates a signle user, found by ID
app.post("/updateUser", (req, res) => {
  let newUser = req.body;
  let users = fs.readFileSync("./data/users.json");
  users = users.toString();
  users = JSON.parse(users);

  users[newUser.id - 1] = newUser;

  fs.writeFileSync("./data/users.json", JSON.stringify(users));

  res.send("request received");
});

//Adds a new user
app.post("/newUser", (req, res) => {
  let newUser = req.body;
  let users = fs.readFileSync("./data/users.json");
  users = users.toString();
  users = JSON.parse(users);

  newUser.id = users.length + 1;

  users.push(newUser);

  fs.writeFileSync("./data/users.json", JSON.stringify(users));

  res.send("request received");
});

//Server listening
app.listen(PORT, () => {
  console.log("Server listening on 3000");
});
