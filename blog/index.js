const express = require("express");
// const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

const connect = require("./schemas");
connect();

// const token = jwt.sign({ test:true }, "peter-secret-key");
// const decoded = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0Ijp0cnVlLCJpYXQiOjE2MzM0ODY2Mjl9.18vbTaMRilSJORKkBb8GirpefgPOtdwQaWAi4OkUJro") 
// console.log(token); 
// console.log(decoded);

const postingRouter = require("./routers/posting");
const userRouter = require("./routers/user");
const commentRouter = require("./routers/comment");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", [postingRouter]);
app.use("/api", [userRouter]);
app.use("/api", [commentRouter]);


app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/posting", (req, res) => {
  res.render("posting");
});

app.get("/detail", (req, res) => {
  res.render("detail");
});

app.get("/edit", (req, res) => {
  res.render("edit");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});


