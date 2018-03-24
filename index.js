var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

const PORT = process.env.PORT || 5000

app.use("/", express.static("public"));

io.on("connection", function(socket) {
    socket.on("rocket1", function(rocket1) {
        console.log(rocket1);
        socket.broadcast.emit("frame1", rocket1);
    });
    socket.on("rocket2", function(rocket2) {
        console.log(rocket2);
        socket.broadcast.emit("frame2", rocket2);
    });
});

http.listen(PORT, function() {
    console.log("listening on *:" + PORT);
});
