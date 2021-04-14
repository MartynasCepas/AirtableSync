"use strict";
const airtableapi = require("../controllers/airtable");
var controller = require("../controllers/controller");

module.exports = function (app) {
  app.route("/api/bubble").get(controller.getDataFromBubble);
  app.route("/api/airtable").get(airtableapi.getDataFromAirtable);
};
