"use strict";
const https = require("https");
var request = require("request");

const bubbleURL = "https://paper-pusher.bubbleapps.io/version-test/api/1.1/obj";
const bubbleWorkflowURL =
  "https://paper-pusher.bubbleapps.io/version-test/api/1.1/wf";
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

exports.postDataToBubble = function (req, res) {
  request.post(
    {
      url: bubbleURL + "/TestTable",
      headers: {
        Bearer: "97a592b87f2da8c128ffc1e59af0fc6a",
        "content-type": "application/json",
      },

      body: JSON.stringify({ test_text: "testapipost15" }),

      method: "POST",
    },

    function (e, r, body) {
      console.log(body);
      // console.log(r);
      res.send(r);
    }
  );
};

exports.deleteDataFromBubble = function (req, res) {
  request.post(
    {
      url:
        "https://paper-pusher.bubbleapps.io/version-test/api/1.1/wf/delete_thing/initialize",
      headers: {
        Bearer: "97a592b87f2da8c128ffc1e59af0fc6a",
        "content-type": "application/json",
      },

      body: JSON.stringify({ test_text: "test1" }),

      method: "POST",
    },

    function (e, r, body) {
      console.log(body);
      // console.log(r);
      res.send(body);
    }
  );
};
