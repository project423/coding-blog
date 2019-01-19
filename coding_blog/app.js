var bodyParser   = require("body-parser"),
methodOverride   = require("method-override"),
expressSanitizer = require("express-sanitizer"),
mongoose         = require("mongoose"),
express          = require("express"),
app              = express(),
//seedDB           = require("./seeds"),
Blog             = require("./models/blogs"),
Comment          = require("./models/comments"),
passport         = require("passport"),
LocalStrategy    = require("passport-local"),
User             = require("./models/user");

//requiring routes
var commentRoutes = require("./routes/comments"),
blogRoutes        = require("./routes/blogs"),
indexRoutes       = require("./routes/index");


// APP CONFIG
//seedDB(); //seed the database
//local mongo server below
var url = process.env.DATABASEURL || "mongodb://localhost/restful_blog_app"
mongoose.connect(url,{ useNewUrlParser: true });



app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use("/",indexRoutes);
app.use("/blogs",blogRoutes);
app.use("/blogs/:id/comments",commentRoutes);



//changed ports for heroku
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server Started!");
});