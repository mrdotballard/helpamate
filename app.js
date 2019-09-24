var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var matesLists = [
  { title: "this weekend", items: ["item1", "item2", "item3"] },
  { title: "house move", items: ["item1", "item2", "item3"] },
  { title: "toms birthday", items: ["item1", "item2", "item3"] }
]


app.get("/", (req, res) => {
  res.render("landing");
});

// display collection of lists
app.get("/mateslists", function (req, res) {
  res.render("mateslists", { matesLists: matesLists });
});

// create list
app.post("/mateslists", function (req, res) {

  var body = req.body;
  var title = body.title;
  delete body.title;
  var itemList = Object.values(body);
  console.log(itemList);
  var newList = { title: title, items: itemList };
  matesLists.push(newList);

  res.redirect("mateslists");
});

// create new list page, sending data to post route
app.get("/mateslists/new", function (req, res) {
  res.render("newlist");
});


app.listen(3000, () => { console.log("Server running") });

