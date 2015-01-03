var express, app, server, bodyParser, compression, path;

express = require('express');
bodyParser = require('body-parser');
compression = require('compression');
path = require('path');
app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(compression());
app.use(express.static(path.join(__dirname, "public")));


require('./tweets')(app);

// default get, for root
app.get(function() {
  res.sendFile(__dirname + "/public/index.html");
});

server = app.listen(3000, function () {
  var host, port;
  host = server.address().address;
  port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
