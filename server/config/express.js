var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
  var app = express();

  app.secret = "superSecret";

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(expressValidator());


  consign()
   .include('auth/authController.js')
   .then('controllers')
   .then('db')
   .into(app);

  return app;
}
