'use strict';

var express = require('express');
var routes = require('./routes');

var app = express();
app.use(express.static('public'));
routes(app);

var server = app.listen(process.env.PORT || 3000, function() {
  var address = server.address();
  console.log('App listening at http://%s:%s', address.address, address.port);
});

module.exports = app;
