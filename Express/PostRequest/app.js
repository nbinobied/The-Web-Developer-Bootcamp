var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.use(bodyParser.urlencoded({
    extended: false
}));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("home");
});

app.post("/addfriend", function (req, res) {
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function (req, res) {
    res.render("friends", {
        friends: friends
    });
});

app.get("*", function (req, res) {
    res.send("You are a star!");
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});