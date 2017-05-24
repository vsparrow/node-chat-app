const path = require("path");
const http = require("http");
const express = require("express");
const sio = require("socket.io");

const {generateMessage,generateLocationMessage} = require("./utils/message.js");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express(); //currently we use express to make our web server
var server = http.createServer(app);//((req,res)=>{})//app.listen creates this exact same method
var io = sio(server); //what we get back is our web sockets server

app.use(express.static(publicPath)); //vreate app, configure middleware

io.on("connection",(socket)=>{
    console.log("New user conneected");
    
    //BEFORE and AFTER use of generateMessage function we made
    //emit is for single user, broadcast is for everyone but that user
    // socket.emit("newMessage",{from: "Admin", text: "Welcome to the chat app",createdAt : new Date().getTime()})
    socket.emit("newMessage", generateMessage("Admin","Welcome to the chat app"));
    // socket.broadcast.emit("newMessage",{from: "Admin", text: "New user joined",createdAt : new Date().getTime()})
    socket.broadcast.emit("newMessage",generateMessage("Admin","New user joined"));

    socket.on("createMessage",(message,callback)=>{
        console.log("createMessage",message)
        io.emit("newMessage", generateMessage(message.from,message.text));
        callback("This is from the server");
        
        
    })
    socket.on("createLocationMessage",(coords)=>{
        io.emit("newLocationMessage",
            generateLocationMessage('Admin',coords.latitude,coords.longitude));
    })
    socket.on("disconnect",()=>{console.log("User disconnected")})

})

server.listen(port, ()=>{  //call app.listen
    console.log("APP STARTED")
});

