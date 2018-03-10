require('date-utils');
const app = require("express")();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');
moment().format();
const ejs = require('ejs');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host : 'mysql',
  user : 'root',
  password : 'password',
  database: 'sensor',
});

//insert test
//connection.query('INSERT INTO lux VALUES ("2000-01-01 10:00:00", 100)', function (error, results, fields) {
//  console.log(results);
//})
//

//select test

// ejsを使用するための設定
//app.engine('ejs',ejs.renderFile);

app.get("/lux/insertdata", function(req, res){
  let lux = req.query.lux;
  let dt = new Date();
  let formatted  = dt.toFormat("YYYYMMDDHH24MISS");
  req.query.time = dt.toFormat("HH24:MI");
  io.emit("new lux", req.query);
  connection.query('INSERT INTO lux VALUES (' + formatted + ','+ lux +')', function (error, results, fields) {
  })
  res.send();
});
  
app.get("/lux/getdata", function(req, res){
  let time = req.query.time;
  let sql = "SELECT * FROM lux WHERE time BETWEEN" + 
             "'" + time + " 00:00:00" +"'" + "AND" + "'" + time + " 23:59:59" + "'" ;
  connection.query(sql, function (error, results, fields) {
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
  let dt = new Date();
  let time = dt.toFormat("YYYY-MM-DD");
  let sql = "SELECT * FROM lux WHERE time BETWEEN" + 
             "'" + time + " 00:00:00" +"'" + "AND" + "'" + time + " 23:59:59" + "'" ;
  connection.query(sql, function (error, results, fields) {
    io.emit("first connect", results);
  });
});

http.listen(80, function(){
  console.log("listening on port:80");
});
