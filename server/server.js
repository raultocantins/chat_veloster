var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var clients = {};
var msgs = [];
var date = new Date();

//Parte das rotas com app

// Parte do chat com SocketIO
io.on("connection", function (client) {
  //juntando client ao server com join
  client.on("join", function (name) {
    console.log("Joined: " + name);
    clients[name] = name;    
    //client.emit("update", "You have connected to the server.");
    client.broadcast.emit("update",  clients);
    client.emit("update",  clients);
    client.emit("chat", msgs);
  });
  client.on("send", function (msg) {
    console.log("Message: " + msg);
    msg.push(client.id);
    msg.push(date.toLocaleString());
    msgs.push(msg);
    client.broadcast.emit("chat", msgs);
    client.emit("chat", msgs);
  });

  client.on("disconnect", function () {
      delete clients[client.id];
    io.emit("update", clients);

  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
