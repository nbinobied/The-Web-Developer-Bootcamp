var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    seed = require("./seed");


//Routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/punlic"));

seed();

//passport
app.use(require("express-session")({
    secret: "Nevermore will rule the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

//Routes
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

//Any
app.get("*", function (req, res) {
    res.send("You are a star!");
});

app.listen(3000, function () {
    console.log('Server listening on port 3000 v4');
});