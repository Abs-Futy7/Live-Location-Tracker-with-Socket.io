const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set the view engine
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static("public"));

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", {id: socket.id, ...data});
    })
    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id);
    })
    console.log("Connected");
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("App is running on port 3000");
});
