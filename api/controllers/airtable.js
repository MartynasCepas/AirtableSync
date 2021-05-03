"use strict";

var Airtable = require("airtable");

async function getDataFromAirtable(airtableKey, callback) {
  var base = new Airtable({ apiKey: airtableKey }).base("app5ZA3rEelmM9HVC");

  var recordList = [];

  base("Prospektgenerator")
    .select({
      // Get all records from view prospektgenerator
      maxRecords: 10000,
      view: "Prospektgenerator",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
          //Create object with needed fields
          var obj = {
            id: record.getId(),
            question: record.get("Question/CTA"),
            grouping: record.get("Grouping"),
            score: record.get("Score"),
            app: record.get("App"),
            max_char: record.get("Max Characters"),
            datatype: record.get("Datatype"),
            dynamic: record.get("Dynamic"),
            on_new_page: record.get("On New Page?"),
            conditional: record.get("Conditional?"),
            answers: record.get("Answers").split(","),
          };
          //Add to list of all objects
          recordList.push(obj);
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        } else {
          // console.log(recordList[0]);
          callback(recordList);
        }
      }
    );
}

module.exports = { getDataFromAirtable };
