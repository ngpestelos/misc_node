var csv = require('csv');

csv().fromPath('/tmp/1cd98b1beaeec9eb6fa792c6e1626301', {"trim" : true})
.on("data", function(data, index) {
  console.log("#" + index + " " + JSON.stringify(data));
});
