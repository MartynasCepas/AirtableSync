var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

app.use(express.json());

var routes = require("./api/routes/routes"); //importing route
routes(app); //register the route

app.listen(port);

console.log("RESTful API server started on: " + port);
