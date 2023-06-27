const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 5000;
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors())

const map1 = new Map();


socketIO.on('connection', (socket) => {

    map1.forEach((values, keys) => {
        console.log("UID / "+keys+" --> SOCKET / "+values);
    })
    console.log("\n\n\n\n");
    
    console.log("NEW Connection : "+socket.id);
    
    socket.on('ehlo', function(data) {
        console.log("Received UID data : "+data);
        map1.set(data,socket.id);
        console.log("MAP SIZE : "+map1.size);
    });


    socket.on("message", data => {
        socket.broadcast.emit("messageResponse", data)
        console.log("DATA "+data)});


    socket.on("testevent", data => {
        socket.to(map1.get(''+data)).emit("new_notif");
        });
        
    socket.on('disconnect', socket.disconnect);
});
   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});