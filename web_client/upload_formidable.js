var formidable = require('formidable'),
    http = require('http'),
    sys = require('sys'),
    fs = require('fs');

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() === "post") {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {"Content-Type" : "text/plain"});
      res.write("received upload: \n\n");
      res.end(sys.inspect({fields: fields, files: files}));

      var path = files.upload.path;
      console.log(path);

      // Open this file and parse for each line
      var stream = fs.createReadStream(path, {"encoding" : "utf8"});
      stream.on('data', function(chunk) {
        console.log(">" + chunk);
      });
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8000);
