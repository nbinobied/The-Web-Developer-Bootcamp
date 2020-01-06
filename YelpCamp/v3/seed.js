var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
        name: "Salmon Creek",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Salmon Creek"
    },
    {
        name: "Granite Hill",
        image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Granite Hill"
    },
    {
        name: "Mountain Goat",
        image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Mountain Goat"
    }
];

function seedDB() {
    //Clean DB
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("DB Cleaned");

        // Add DB
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Campground Added");

                    // Comments
                    Comment.create({
                        text: "This is a test comment",
                        author: "Homer"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Comment Added");
                        }
                    })
                }
            })
        });
    });


}

module.exports = seedDB;