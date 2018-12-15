var express = require("express");


//App setup
var app = express();
var http = require('http').createServer(app);
var io = require("socket.io")(http, {wsEngine: 'ws'});
var server = http.listen(4000, function(){
	console.log("listening to request on port 4000");
});

//Static files
app.use(express.static("public"));

//Socket setup

io.on("connection", function(socket){
	console.log("made socket connection", socket.id);
	
	socket.on("chat", function(data){
		io.sockets.emit("chat", data);
	});
	
});
