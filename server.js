// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.connect(MONGODB_URI);
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");



var cheerio = require("cheerio");
var axios = require("axios");

var db = require(".models");
var PORT = 3700;

var app =  express();

// Make a request via axios to grab the HTML body from the site of your choice
axios.get("https://news.vice.com/en_us").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("article").each(function(i, element) {

    var headline = $(element).children().text();
    var summary = $(element).find("a").attr("href");
    var url = $(element).find("a").attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      headline: headline,
      summary: summary,
      url: url,


    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});