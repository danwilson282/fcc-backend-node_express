var bodyParser = require("body-parser");
let express = require('express');
let app = express();
//console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }));


app.use(function middleware(req, res, next) {
  // Do something
  console.log(req.method+" "+req.path+" - "+req.ip )
  // Call the next function in line:
  next();
});

app.get('/now', (req,res,next)=>{
  req.time = new Date().toString();
  next();
}, (req,res)=>{
  res.json({time: req.time});
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

//app.post("/name", (req, res) => {
//  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
//  res.json({
//    name: `${firstName} ${lastName}`
//  });
//});

app.get('/', (req,res) => {
  res.sendFile(__dirname+"/views/index.html");
});
app.use("/public", express.static(__dirname + "/public"));
app.get('/json', (req,res) => {
  if (process.env['MESSAGE_STYLE']=="uppercase"){
    res.json({"message": "HELLO JSON"});
  }
  else{
    res.json({"message": "Hello json"});
  }
  
});



































 module.exports = app;
