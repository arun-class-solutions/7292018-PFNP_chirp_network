//Require modules and models

var express = require("express");
var models = require("./models/index");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

//Set view engine

app.set("view engine", "ejs");

//Middleware

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.redirect(301, "/chirps");
});

//Get all chirps
app.get("/chirps", (req, res) => {
  // Step 1: Retrieve chirps from DB
  // Step 2: Create HTML with chirps inside
  // Step 3: Send back HTML to browser

  models.Chirp.findAll().then((chirps) => {
    res.render("index", { chirps });
  });

  // Navigate to http://localhost:3000/chirps to see your app
});

//Create new chirp
app.post("/chirps", (req, res) => {
  // Step 1: Retrieve new chirp text from form submission
  // Step 2: Save new chirp to the DB
  // Step 3: Redirect user back to /chirps

  var newChirp = req.body;

  models.Chirp.create(newChirp).then(() => {
    res.redirect("/chirps");
  });
});

//Get specific chirp
app.get("/chirps/:id/edit", (req, res) => {
  // Step 1: Retrieve specific chirp from DB via its ID that comes from the URL
  // Step 2: Create HTML with specific chirp inside
  // Step 3: Send back finished HTML to browser

  var chirpId = req.params.id;

  models.Chirp.findById(chirpId).then((chirp) => {
    res.render("edit", { chirp });
  });
});

//Edit a chirp

//Delete a chirp

app.listen(process.env.PORT || 3000);
