"use strict";
const https = require("https");
var request = require("request");

const bubbleURL = "https://paper-pusher.bubbleapps.io/version-test/api/1.1/obj";
const airtableURL =
  "https://api.airtable.com/v0/appcu1qWsme6tzNri/Questions?maxRecords=3&view=All";

exports.getDataFromBubble = function (req, res) {
  request.get(
    {
      url: bubbleURL + "/TestTable",
      headers: {
        Bearer: "97a592b87f2da8c128ffc1e59af0fc6a",
      },
      method: "GET",
    },

    function (e, r, body) {
      console.log(body);
      res.send(body);
    }
  );
};

exports.postDataToBubble = function (req, res){
  request.post(
    {
      url: bubbleURL + "/TestTable",
      headers: {
        Bearer: "97a592b87f2da8c128ffc1e59af0fc6a",
      },
      method: "POST",
    },

    function (e, r, body) {
      console.log(body);
      res.send(body);
    }
  );
}
