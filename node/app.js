const app = require("express")();
const http = require('http').Server(app);

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

var server = app.listen(1337, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

