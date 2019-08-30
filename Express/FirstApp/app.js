var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("Hi there!");
});

app.get("/bye", function (req, res) {
    res.send("bye!");
});

app.get("/dog", function (req, res) {
    res.send("MEOW");
});

app.get("/r/:subredditName", function (req, res) {
    var subreddit = req.params.subredditName;
    res.send("Welcome to " + subreddit + " subreddit!");
});

app.get("/r/:subredditName/comment/:id/:title/", function (req, res) {
    console.log(req.params);
    res.send("Welcome to comment page");
});

app.get("*", function (req, res) {
    res.send("You are a star!");
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});