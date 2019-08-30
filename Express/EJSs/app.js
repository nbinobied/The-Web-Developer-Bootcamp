var express = require("express");
var app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/fallinginlovewith/:person", function (req, res) {
    var person = req.params.person;
    res.render("love", {person: person});
});

app.get("/posts", function (req, res) {
    var posts = [
        {title: "Post1", author: "Susy"},
        {title: "Post2", author: "Charlie"},
        {title: "Post3", author: "Colt"}
    ];

    res.render("post", {posts: posts});
});

app.get("*", function (req, res) {
    res.send("You are a star!");
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});