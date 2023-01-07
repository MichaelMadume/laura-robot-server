import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: true },
});

io.on("connection", (socket) => {
  console.log("New agent connected");

  socket.on("joinRoom", (event) => {
    socket.join(event);
  });

  socket.on("listener:camera-feed", (event) => {
    io.to("controller").emit("listener:camera-feed", event);
  });

  socket.on("controller:input", (event) => {
    io.to("listener").emit("controller:input", event);
  });
});

httpServer.listen();
console.log("Listening for requests");
