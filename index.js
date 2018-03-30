var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");

var app = express();

var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb('mongodb://localhost:27017/kapil_db'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

//console.log(conn);


var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
    port = server.address().port;
});