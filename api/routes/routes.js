"use strict";
const airtableapi = require("../controllers/airtable");
var controller = require("../controllers/controller");

module.exports = function (app) {
  app.route("/api/sync").get(controller.sync);
};
