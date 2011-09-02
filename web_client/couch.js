var client = require("couch-client");

var zzz = client("http://localhost:5984/zzz");

//zzz.save({"name" : "foo"}, function() { console.log("saved!"); });

zzz.changes(0, function(x, doc) {
  console.log(doc);
});
