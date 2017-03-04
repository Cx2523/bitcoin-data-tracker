var express = require('express');
var bodyParser = require('body-parser');

var serverApp = express();

var PORT = 8080;

serverApp.use(express.static("./"));
serverApp.use(bodyParser.json());

serverApp.listen(PORT,function(){
  console.log("listening on port: " + PORT);
});
