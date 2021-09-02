// server.js
// where your node app starts
var dayname = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var monname = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req, res)=> {
  jso = {"unix": Date.now(), "utc": new Date().toString()};
  res.json(jso);
});

app.get("/api/:date?", (req, res)=> {
  try{
    num = req.params.date;
    console.log(num);

    if(isNaN(num)){
      var dat = new Date(num);
    }else{
      var dat = new Date();
      dat.setTime(num);
    }
    if (isNaN(dat.getTime())){
      throw 'Not a date';
    }
    
    if (dat.getHours() < 10){
      hrs = "0" + dat.getHours();
    }else{
      hrs = "" + dat.getHours();
    }
    if (dat.getMinutes() < 10){
      mns = "0" + dat.getMinutes();
    }else{
      mns = "" + dat.getMinutes();
    }
    if (dat.getSeconds() < 10){
      sec = "0" + dat.getSeconds();
    }else{
      sec = "" + dat.getSeconds();
    }
    if (dat.getDate() < 10){
      numdat = "0" + dat.getDate();
    }else{
      numdat = dat.getDate();
    }
    strdat = dayname[dat.getDay()] + ", " + numdat + " " +
             monname[dat.getMonth()] + " " + dat.getFullYear() + " " + hrs + ":" +
             mns + ":" + sec + " GMT";
    jso = {"unix": dat.getTime(), "utc": strdat};
    res.json(jso);
  }catch{
    jso = {"error": "Invalid Date"};
    res.json(jso);
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
