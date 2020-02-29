var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Campground = require("../models/campground");

router.get("/", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: campgrounds
            });
        }
    });
});

// Create
router.post("/", isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var campground = {
        name: name,
        image: image,
        description: description,
        author: author
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
router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// Show 
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {
                campground: campground
            });
        }
    });
});

//Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;