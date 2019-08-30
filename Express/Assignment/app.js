var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function (req, res) {
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof",
        cat: "Meow",
        goldfish: "..."
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];

    res.send("The " + animal + " says " + sound);
});

app.get("/speak/cow", function (req, res) {
    res.send("The cow says 'Moo'");
});

app.get("/speak/dog", function (req, res) {
    res.send("The dog says 'Woof'");
});

app.get("/repeat/:message/:count", function (req, res) {
    var message = req.params.message;
    var count = Number(req.params.count);
    var result = "";
    
    for (let index = 0; index < count; index++) {
        result += message + " ";
    }

    res.send(result);
});

app.get("*", function (req, res) {
    res.send("You are a star!");
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});