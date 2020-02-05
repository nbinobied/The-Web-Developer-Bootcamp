var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comments New
router.get("/new", isLogginIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {
                campground: campground
            });
        }
    })
});

//Comment Create
router.post("/", isLogginIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//Middleware
function isLogginIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;