var express = require('express');
var bodyParser = require("body-parser");
var router = require('./routes/routes');

var myErrorLogger = require('./public/javascripts/ErrorLogger');
var myRequestLogger = require('./public/javascripts/RequestLogger');



var appPort=7000;

var cors = require('cors');
var app = express();

 app.use(cors());

 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json());

app.use(myRequestLogger);
app.use('/', router);
app.use(myErrorLogger);

app.listen(appPort);
console.log("User Micro Server Started at port:", appPort);