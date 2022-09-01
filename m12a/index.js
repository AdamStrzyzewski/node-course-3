const WebSocketServer = new require("ws");

const wss = new WebSocketServer.Server({ port: 8080 });

const clients = [];

wss.on("connection", (ws) => {
  let id = clients.length; // 0,1,2,3,4,5
  clients[id] = ws;
  console.log(`nowe połączenie #${id}`);
  clients[id].send(`Cześć, został ci nadany numer ${id}`);
  clients.forEach((clientWs, index) => {
    if (index !== id) {
      clientWs.send(`dołączył nowy użytkownik o id ${id}`);
    }
  });
});
