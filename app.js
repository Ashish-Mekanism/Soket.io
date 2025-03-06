const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500" }));
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://127.0.0.1:5500", methods: ["GET", "POST"] }
});

io.on("connection", (socket) => {
  console.log("Client Connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Got MSG From Client:", data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client Got Disconnect:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Socket.IO Server is Running!");
});

server.listen(3000, () => {
  console.log("Server is Running on Port 3000");
});
