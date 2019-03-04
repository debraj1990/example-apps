var express = require('express');
var router = express.Router();

var os = require("os");


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Node-app', host: os.hostname() });
});

module.exports = router;
