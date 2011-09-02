// http://debuggable.com/posts/streaming-file-uploads-with-node-js:4ac094b2-b6c8-4a7f-bd07-28accbdd56cb

var http = require("http");
var multipart = require("multipart");
var fs = require('fs');

var server = http.createServer(function(request, response) {
  switch (request.uri.path) {
    case '/':
      response.sendHeader(200, {"Content-Type" : "text/plain"});
      response.sendBody(
        '<form action="/upload" method="post" enctype="multipart/form-data">' +
        '<input type="file" name="upload-file">' +
        '<input type="submit" value="Upload">' +
        '</form>'
      );
      response.finish();
    case '/upload':
      upload_file(request, response);
  }
});

function upload_file(request, response) {
  request.setEncoding("utf8");
  var fd = fs.createWriteStream("/tmp/foo.txt");

  var stream = new multipart.Stream(request);
  stream.addListener('part', function(part) {
    part.addListener('body', function(chunk) {
      fd.write(chunk);
    });
  });

  stream.addListener('complete', function() {
    fd.end();  
    response.sendHeader(200, {"Content-Type" : "text/plain"});
    response.sendBody('Thanks for playing!');
    response.finish();
  });
}

server.listen(8000);
