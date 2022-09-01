const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("/public"));

io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("message", [1, 2, 3]);
  socket.emit("message", { test: 1 });
});

http.listen(3002, () => {
  console.log("listening");
});
