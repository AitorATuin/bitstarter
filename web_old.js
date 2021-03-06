var express = require('express');
var fs = require('fs');

var app = express.createServer(express.logger());

function renderIndex(file)  {
    return fs.readFileSync(file);
}

app.get('/', function(request, response) {
    response.send(renderIndex("index.html").toString());
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
