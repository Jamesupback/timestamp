// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  date=new Date()
  res.json({"unix":date.getTime(),"utc":date.toUTCString()});
})

app.get("/api/:date",(req,res)=>{
  unix=/\d{13}/;
  date=new Date(req.params.date);
  if(unix.test(req.params.date))
  {
    udate=new Date(Number(req.params.date))
    res.json({"unix":udate.getTime(),"utc":udate.toUTCString()});
  }
  else if(date instanceof Date && !isNaN(date))
  {
    res.json({"unix":date.getTime(),"utc":date.toUTCString()});
  }
  else
  {
    res.json({ "error" : "Invalid Date" })
  }
  
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
