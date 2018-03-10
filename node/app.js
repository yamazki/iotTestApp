require('date-utils');
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
  timezonw: 'jst'
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

// ejs$B$r;HMQ$9$k$?$a$N@_Dj(B
//app.engine('ejs',ejs.renderFile);

app.get("/lux/insertdata", function(req, res){
  console.log(req.query);
  io.emit("new lux", req.query);
  let lux = req.query.lux;
  let dt = new Date();
  let formatted = dt.toFormat("YYYYMMDDHH24MISS");
  connection.query('INSERT INTO lux VALUES (' + formatted + ','+ lux +')', function (error, results, fields) {
    console.log(results);
  })
  res.send();
});
  
app.get("/lux/getdata", function(req, res){
  console.log(req.query);
  connection.query('SELECT * FROM lux ', function (error, results, fields) {
    res.send(results);
  });
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
