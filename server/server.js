const path = require("path");
const http = require("http");
const express = require("express");
const sio = require("socket.io");

const {generateMessage,generateLocationMessage} = require("./utils/message.js");
const {isRealString} = require("./utils/validation.js")
const {Users} = require("./utils/users.js")

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express(); //currently we use express to make our web server
var server = http.createServer(app);//((req,res)=>{})//app.listen creates this exact same method
var io = sio(server); //what we get back is our web sockets server
var users = new Users();

app.use(express.static(publicPath)); //vreate app, configure middleware

io.on("connection",(socket)=>{
    console.log("New user conneected");
    
    //BEFORE and AFTER use of generateMessage function we made
    //emit is for single user, broadcast is for everyone but that user
    // socket.emit("newMessage",{from: "Admin", text: "Welcome to the chat app",createdAt : new Date().getTime()})
    
    // socket.broadcast.emit("newMessage",{from: "Admin", text: "New user joined",createdAt : new Date().getTime()})


    socket.on("join",(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback("Name and room name are required")
        }
        socket.join(params.room);   //user joins room
        //join the room specified in params, ie: "Office Chat, etc"
        //socket.leave("THe Office fans")
        //io.emit->io.to("The Office fans").emit
        // socket.broadcast.emit->socket.broadcast.to("the office fans").emit
        // socket.emit
        users.removeUser(socket.id) //we remove user from any previous rooms
        users.addUser(socket.id,params.name,params.room) //finally add user to new room
        
        io.to(params.room).emit("updateUserList",users.getUserList(params.room));
        socket.emit("newMessage", generateMessage("Admin","Welcome to the chat app"));
        //broadcast to all users
        // socket.broadcast.emit("newMessage",generateMessage("Admin","New user joined"));    
        //broadcast to user insude the room only //also name is now using params.name rather than generic
        socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin",`${params.name} has joined`));
        callback();
    });

    socket.on("createMessage",(message,callback)=>{
        console.log("createMessage",message)
        io.emit("newMessage", generateMessage(message.from,message.text));
        callback();
        
        
    })
    socket.on("createLocationMessage",(coords)=>{
        io.emit("newLocationMessage",
            generateLocationMessage('Admin',coords.latitude,coords.longitude));
    })
    socket.on("disconnect",()=>{
        // console.log("User disconnected")
        var user = users.removeUser(socket.id); //console.log("socket on disconnect:",user);
        if(user){ //if user was removed, then var user would be true/ not null/undefined
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage",generateMessage("Admin",`${user.name} has left.`));
            // console.log(`${user[0].name} has left`)    
        }
        
    })

})

server.listen(port, ()=>{  //call app.listen
    console.log("APP STARTED")
});

