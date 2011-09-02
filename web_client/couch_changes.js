var client = require("couch-client");

var couch = client("http://localhost:5985");

var stream = couch.request("GET", "/greenapple/_changes?filter=main/price-list&feed=continuous");

stream.on("error", function() {
  console.log("Stream error");
});

stream.on("data", function() {
  console.log("got data");
});

stream.on("end", function() {
  console.log("end");
});
