const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const port = 3000;
const app = express();

// Connect to mongoDB database
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create database Schemas
const postSchema = mongoose.Schema({
  title: String,
  text: String,
});

// Crteate mongoose model
const Post = mongoose.model("Post", postSchema);

const day1 = {
  day: "Day 1",
  text:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
};
const day2 = {
  day: "Day 2",
  text:
    "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
};
const home =
  "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.";

let day = 3;
let entries = [day1, day2];

// Set templating engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Set body-parse to process post requests
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    if (!err) {
      if (posts.length === 0) {
        // Show default posts
        const defaultPost = new Post({
          title: "home",
          text:
            "This is your personal blog. You can display here a home message",
        });
        defaultPost.save();
        res.render("blog", {
          home: defaultPost.title,
          entries: [],
        });
      } else {
        const home = posts.find(element => element.title === "home");
        const blogPosts = posts.filter(element => element.title !== "home");
        res.render("blog", { home: home.text, entries: blogPosts });
      }
    } else {
      console.log(err);
    }
  });
});

app.get("/compose", function (req, res) {
  res.render("compose/compose", { site: "compose" });
});

app.post("/compose", function (req, res) {
  var postTitle = req.body.title;
  var inputText = req.body.blogEntryText;

  console.log(postTitle);

  var newEntry = { day: day++, text: inputText };
  entries = [...entries, newEntry];
  res.redirect("/");
});

app.get("/aboutus", function (req, res) {
  res.render("aboutUs");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.listen(port, function () {
  console.log("Server is listening on port: " + port);
});
