var express = require("express");
  var app = express();
  http = require('http');
  server = http.createServer(app);
  var io = require('socket.io').listen(server);

//io.configure(function() {
    //io.set("transports", [ "xhr-polling" ]);
    //io.set("polling duration", 100000);
//});

server.listen(8080 || process.env.PORT);

app.use(express.static(__dirname + '/'));


io.sockets.on('connection', function(socket) {
    // when the user disconnects.. perform this
    socket.on('disconnect', function() {
        console.log("Connection " + socket.id + " terminated.");
    });
});
