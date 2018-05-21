var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var qrCode = require('qrcode');

module.exports = function(){
  var app = express();

  app.qrCode = qrCode;

  app.secret = "superSecret";

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(expressValidator());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "x-access-token");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, X-XSRF-TOKEN, Authorization, Content-Type, Accept");

    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
});

  consign()
   .include('auth/authController.js')
   .then('controllers')
   .then('db')
   .into(app);

  return app;
}
