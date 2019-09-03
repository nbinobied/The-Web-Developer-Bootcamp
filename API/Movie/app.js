var express = require("express");
var request = require("request");

var app = express();
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("search");
});

app.get("/results", function (req, res) {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
    
    request(url, function (error, respones, body) {
        if (!error && respones.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

app.get("*", function (req, res) {
    res.send("You are a star!");
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});