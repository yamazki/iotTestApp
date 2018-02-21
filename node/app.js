const app = require("express")();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ejs = require('ejs');

// ejs$B$r;HMQ$9$k$?$a$N@_Dj(B
app.engine('ejs',ejs.renderFile);

app.get("/data", function(req, res){
  console.log(req.query);
  io.emit("new lux", req.query);
  res.send();
});

//ejs
//app.get('/', function(req, res) {
//    res.render('index.ejs', {title : 'graph'});
//});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/html/index.html");
});

io.on("connection", function(socket){
  console.log("a user connected");
});

http.listen(80, function(){
  console.log("listening on *:80");
});
