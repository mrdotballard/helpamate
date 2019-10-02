var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/helpamate", { useUnifiedTopology: true, useNewUrlParser: true });
// Schema setup
var myListSchema = new mongoose.Schema({
  title: String,
  items: Array
});
var myList = mongoose.model("myList", myListSchema);

var myLists = [
  { title: "this weekend", items: ["item1", "item2", "item3"] },
  { title: "house move", items: ["item1", "item2", "item3"] },
  { title: "toms birthday", items: ["item1", "item2", "item3"] }
]


app.get("/", (req, res) => {
  res.render("landing");
});

// display collection of lists
app.get("/mylists", function (req, res) {
  myList.find({}, function (err, allLists) {
    if (err) {
      console.log(err);
    } else {
      res.render("mylists", { myLists: allLists });
    }
  });
});


// create new list page, sending data to post route
app.get("/mylists/new", function (req, res) {
  res.render("newlist");
});


// create list
app.post("/mylists", function (req, res) {

  var body = req.body;
  var title = body.title;
  delete body.title;
  // Returns array from body object
  var itemList = Object.values(body);
  console.log(itemList);
  // 1) Get data from form and save to DB
  var newList = { title: title, items: itemList };
  myList.create(newList, function (err, newlyCreatedList) {
    if (err) {
      console.log(err);
    } else {
      // 2) Redirect back to 'myLists'
      res.redirect("mylists");
    }
  });
});




app.listen(4000, () => { console.log("Server running") });

