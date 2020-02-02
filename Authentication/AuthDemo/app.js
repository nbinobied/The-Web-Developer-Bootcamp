var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_demo");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require("express-session")({
    secret: "Nevermore is the deadlist cat",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes

//Signup
//signup form
app.get("/register", function (req, res) {
    res.render("register");
});
//signup handling
app.post("/register", function (req, res) {
    req.body.username;
    req.body.password;
    User.register(new User({
        username: req.body.username
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("secret");
        });
    })
});

//Login
//Login form
app.get("/login", function (req, res) {
    res.render("login");
});
//Login handling
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (res, req) {

});


//logout
//logout form
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});

app.get("/", function (req, res) {
    res.render("home");
});

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}