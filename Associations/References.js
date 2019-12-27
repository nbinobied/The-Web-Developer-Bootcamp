var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");

Post.create({
    title: "How to cook part 4",
    content: "qweasdwezd"
}, function (err, post) {
    User.findOne({
        email: "bob@gmail.com"
    }, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            user.posts.push(post);
            user.save(function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob"
// });

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// });