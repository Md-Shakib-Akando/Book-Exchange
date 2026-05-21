import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // frontend
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (conversationId) => {
        socket.join(conversationId);
    });

    socket.on("sendMessage", (data) => {
        io.to(data.conversationId).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(5000, () => {
    console.log("Socket server running on 5000");
});