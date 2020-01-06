var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB = require("./seed");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

// Campgrounds
app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                campgrounds: campgrounds
            });
        }
    });
});

// Create
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var campground = {
        name: name,
        image: image,
        description: description
    }
    Campground.create(campground, function (err, Created) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});

// Create Form
app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

// Show 
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log(campground);
            res.render("show", {
                campground: campground
            });
        }
    });
});

app.get("*", function (req, res) {
    res.send("You are a star!");
});

app.listen(3000, function () {
    console.log('Server listening on port 3000 v3');
});