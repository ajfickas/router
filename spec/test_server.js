var express = require('express');
var app = express();

app.get('*', function(request, response) {
  path = request.path;
  filepath = "." + path;
  console.log("Sending file: " + filepath);
  response.sendfile(filepath);
});

app.listen(3000);

console.log("Server running at localhost:3000");