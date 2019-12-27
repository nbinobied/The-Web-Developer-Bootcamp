var expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

//CONFIG
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSanitizer());

// MONGOS
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
var Blog = mongoose.model("Blog", blogSchema);

// ROUTES
app.get("/", function (req, res) {
    res.redirect("/blogs");
});

// LIST
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                blogs: blogs
            });
        }
    });
});

// NEW
app.get("/blogs/new", function (req, res) {
    res.render("new");
});

// CREATE
app.post("/blogs", function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function (err, blog) {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
});

// SHOW
app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {
                blog: blog
            });
        }
    });
});

// EDIT
app.get("/blogs/:id/edit", function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {
                blog: blog
            });
        }
    });
});

// UPDATE
app.put("/blogs/:id", function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, blog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + blog.id);
        }
    });
});

// DELETE
app.delete("/blogs/:id", function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
})

app.listen(3000, function () {
    console.log("Server listening on port 3000");
});