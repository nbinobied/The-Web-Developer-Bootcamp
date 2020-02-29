var express = require("express");
var router = express.Router({
    mergeParams: true
});
var Campground = require("../models/campground");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var campground = {
        name: name,
        image: image,
        description: description,
        author: author,
        price: price
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
router.get("/new", middleware.isLoggedIn, function (req, res) {
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

//Edit
router.get("/:id/edit", middleware.checkCampgroundOwnershop, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        req.flash("error", "Campground not found");
        res.render("campgrounds/edit", {
            campground: campground
        });
    });
});

//Update
router.put("/:id", middleware.checkCampgroundOwnershop, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, campground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy
router.delete("/:id", middleware.checkCampgroundOwnershop, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
})

module.exports = router;