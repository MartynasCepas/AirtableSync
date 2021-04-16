"use strict";
const Airtable = require("airtable");
const https = require("https");
const fetch = require("node-fetch");
var request = require("request");
const airtableapi = require("../controllers/airtable");

const bubbleURL = "https://paper-pusher.bubbleapps.io/version-test/api/1.1/obj";
const bubbleWorkflowURL =
  "https://paper-pusher.bubbleapps.io/version-test/api/1.1/wf";
const airtableURL =
  "https://api.airtable.com/v0/appcu1qWsme6tzNri/Questions?maxRecords=3&view=All";

async function getAllDataFromBubble(callback) {
  var requestList = [];
  var cursor = 0;
  var remaining = 100;

  do {
    await fetch(bubbleURL + "/Question?limit=50&cursor=" + cursor)
      .then((res) => res.json())
      .then((json) => {
        remaining = json.response.remaining;
        cursor += 50;
        json.response.results.forEach((item) => {
          requestList.push(item);
        });
      });
  } while (remaining != 0);
  callback(requestList);
}

function postDataToBubble(newItem, callback) {
  request.post(
    {
      url: bubbleURL + "/Question",
      headers: {
        Bearer: "97a592b87f2da8c128ffc1e59af0fc6a",
        "content-type": "application/json",
      },

      body: JSON.stringify(newItem),

      method: "POST",
    },

    function (e, r, body) {
      //console.log(body);
      // console.log(r);
      callback(body);
    }
  );
}

function deleteDataFromBubble(itemid, callback) {
  request.delete(
    {
      url: bubbleURL + "/Question/" + itemid,
      headers: {
        Bearer: "97a592b87f2da8c128ffc1e59af0fc6a",
      },

      method: "DELETE",
    },

    function (e, r, body) {
      callback(body);
    }
  );
}

exports.sync = function (req, res) {
  airtableapi.getDataFromAirtable(function (airtableData) {
    getAllDataFromBubble(function (bubble_data) {
      findAdd(airtableData, bubble_data);
      findDelete(airtableData, bubble_data);
      res.send("working");
    });
  });
};

function findAdd(airtableData, bubbleData) {
  var bubbleObj = bubbleData;
  var listToAdd = [];

  airtableData.forEach((airtableItem) => {
    if (airtableItem.app === undefined) {
      airtableData.pop(airtableItem);
    }
  });

  airtableData.forEach((airtableItem) => {
    var add = 1;

    bubbleObj.forEach((bubbleItem) => {
      if (
        airtableItem.id.replace(/\s+/g, "") ==
        bubbleItem.airtableid_text.replace(/\s+/g, "")
      ) {
        add = 0;
      }
    });

    if (add == 1 && airtableItem.app != undefined) {
      var newBubbleItem = {
        airtableid_text: airtableItem.id || "",
        appid_text: airtableItem.app[0] || "",
        conditional_text: airtableItem.conditional || "",
        datatype_text: airtableItem.datatype || "",
        dynamic_text: airtableItem.dynamic || "",
        grouping_text: airtableItem.grouping || "",
        maxchar_number: airtableItem.max_char || 0,
        onnewpage_number: airtableItem.on_new_page || 0,
        question_text: airtableItem.question || "",
        score_text: airtableItem.score || "",
      };

      listToAdd.push(newBubbleItem);
      console.log(
        "'" +
          newBubbleItem.airtableid_text +
          "'" +
          " " +
          "'" +
          airtableItem.id +
          "'"
      );
    }
  });

  console.log("New item count: " + listToAdd.length);
  console.log("Airtable rows count: " + airtableData.length);
  console.log("Bubble rows count: " + bubbleObj.length);
  listToAdd.forEach((newitem) => {
    try {
      //  postDataToBubble(newitem, function (response) {
      console.log(newitem);
      //  });
    } catch (e) {
      console.log(e);
    }
  });
}

function findDelete(airtableData, bubbleData) {
  var bubbleObj = bubbleData;
  var listToDelete = [];

  bubbleObj.forEach((bubbleItem) => {
    if (
      !airtableData.some(
        (airtableItem) => airtableItem.id === bubbleItem.airtableid_text
      )
    ) {
      listToDelete.push(bubbleItem);
    }
  });

  console.log(listToDelete);
  console.log("Delete items count: " + listToDelete.length);

  listToDelete.forEach((item) => {
    try {
      deleteDataFromBubble(item._id, function (response) {
        console.log(item._id);
        console.log(response);
      });
    } catch (e) {
      console.log(e);
    }
  });
}
