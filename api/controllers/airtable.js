"use strict";

var Airtable = require("airtable");

async function getDataFromAirtable(airtableKey, callback) {
  var base = new Airtable({ apiKey: airtableKey }).base("appcu1qWsme6tzNri");

  var recordList = [];

  base("Questions")
    .select({
      // Get all records from view prospektgenerator
      maxRecords: 10000,
      view: "Sync-view",
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
            order: record.get("Order"),
            app: record.get("Name (from App)") || [],
            max_char: record.get("Max Characters"),
            datatype: record.get("Datatype"),
            dynamic: record.get("Dynamic"),
            on_new_page: record.get("On New Page?"),
            conditional: record.get("Conditional?") || false,
            answers: record.get("Antwort (from Answers)") || [],

            compulsory: record.get("Compulsory?") || false,
            placeholder: record.get("Placeholder") || "",
            is_multicolumn: record.get("Multi-Column") || false,
            multicolumn_id: record.get("Multi-Column-ID") || "",
            conditional_answers:
              record.get("Antwort (from Conditional_Answer)") || [],
            conditional_question: record.get("Conditional Question"),

            description: record.get("Description (from Informations)") || [""],
            infotext: record.get("Infotext (from Informations)") || [""],
            video: record.get("Explainer Video (from Informations)") || [""],
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
