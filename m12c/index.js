const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

server.listen(3003, function () {
  console.log("server is running at port 3003");
});

const users = {};

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

io.sockets.on("connection", (client) => {
  console.log(client.handshake.query.token);
  const broadcast = (event, data) => {
    client.emit(event, data); // to wysyła do pojedynczego klienta
    client.broadcast.emit(event, data); // to zostanie wysłane do wszystkich innych
  };

  client.on("newUser", (name) => {
    users[client.id] = { name, color: getRandomColor() };
    broadcast("user", users);
  });

  client.on("message", (message) => {
    if (users[client.id].name !== message.name) {
      users[client.id].name = message.name;
      broadcast("user", users);
    }
    broadcast("message", { ...message, color: users?.[client.id]?.color });
  });

  client.on("disconnect", () => {
    delete users[client.id];
    client.broadcast.emit("user", users);
  });
});
