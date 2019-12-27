var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bog_demo");

// Post
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

// User
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var NewUser = new User({
//     email: "hermione@hogwart.edu",
//     name: "Hermione Granger"
// });

// NewUser.posts.push({
//     title: "How to brew Polyjuice Potion",
//     content: "Go to Potion Class"
// });

// NewUser.save(function (err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var NewPost = new Post({
//     title: "Apples",
//     content: "Test Apple"
// });

// NewPost.save(function (err, post) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({
    name: "Hermione Granger"
}, function (err, user) {
    if (err) {
        console.log(err);
    } else {
        user.posts.push({
            title: "3 Things I really Hate",
            content: "Voldemort. ?????. Profit."
        });
        user.save(function (err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});