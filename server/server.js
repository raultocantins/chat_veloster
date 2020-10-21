var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var clients = {};
var msgs=[]
var date=new Date()
//Parte das rotas com app

// Parte do chat com SocketIO
io.on("connection", function (client) {
  //juntando client ao server com join
  client.on("join", function(name){    
    console.log("Joined: " + name);
    clients[client.id] = name;    
    client.emit("update", [{msg:`You have connected to the server.`,date:date,name:name}]);
    client.broadcast.emit("update", name + " has joined the server.")
    client.emit("chat", msgs);
  });
  client.on("send", function(msg){    
    console.log("Message: " + msg);
    msg.push(client.id)
    msg.push(date.toLocaleString())
    msgs.push(msg)
    client.broadcast.emit("chat", msgs);
    client.emit("chat",msgs)
  });

  client.on("disconnect", function(){
    console.log("Disconnect");
    io.emit("update", clients[client.id] + " has left the server.");
    delete clients[client.id];
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
