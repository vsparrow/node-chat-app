const path = require("path");
const http = require("http");
const express = require("express");
const sio = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express(); //currently we use express to make our web server
var server = http.createServer(app);//((req,res)=>{})//app.listen creates this exact same method
var io = sio(server); //what we get back is our web sockets server

app.use(express.static(publicPath)); //vreate app, configure middleware

io.on("connection",(socket)=>{
    console.log("New user conneected");
    // socket.emit("newMessage",{from:"user1",text:"I saw Rouge One",createdAt: 123})        
    socket.on("createMessage",(message)=>{
        console.log("createMessage",message)
        io.emit("newMessage",{
            from: message.from,
            text : message.text,
            createdAt : new Date().getTime()
        })
    })
    socket.on("disconnect",()=>{console.log("User disconnected")})

})

server.listen(port, ()=>{  //call app.listen
    console.log("APP STARTED")
});

