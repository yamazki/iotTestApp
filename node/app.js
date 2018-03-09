const app = require("express")();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ejs = require('ejs');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host : 'mysql',
  user : 'root',
  password : 'password',
  database: 'sensor',
});

connection.connect();

//insert test
//connection.query('INSERT INTO lux VALUES ("2000-01-01 10:00:00", 100)', function (error, results, fields) {
//  console.log(results);
//})
//

//select test
connection.query('SELECT * FROM lux ', function (error, results, fields) {
  console.log(results);
})

// ejsを使用するための設定
//app.engine('ejs',ejs.renderFile);

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
  console.log("listening on port:80");
});
