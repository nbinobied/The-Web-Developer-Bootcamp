var Campground = require("../models/campground");
var Comment = require("../models/comment");
//middleware
var middleware = {};

middleware.checkCampgroundOwnershop = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, campground) {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First");
        res.redirect("back");
    }
}

middleware.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, comment) {
            if (err) {
                res.redirect("back");
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
}

module.exports = middleware