var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var clients = {};

//Parte das rotas com app



// Parte do chat com SocketIO
io.on("connection", function (client) {
  //juntando client ao server com join
  client.on("join", function(name){
    console.log("Joined: " + name);
    clients[client.id] = name;
    client.emit("update", "You have connected to the server.");
    client.broadcast.emit("update", name + " has joined the server.")
  });

  client.on("send", function(msg){
    console.log("Message: " + msg);
    client.broadcast.emit("chat", clients[client.id], msg);
  });

  client.on("disconnect", function(){
    console.log("Disconnect");
    io.emit("update", clients[client.id] + " has left the server.");
    delete clients[client.id];
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
