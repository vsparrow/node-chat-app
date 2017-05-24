var socket = io();  
socket.on("connect",function(){
    console.log("Connected to server")
});
socket.on("disconnect",function(){console.log("Disconnected from server")});
socket.on("newMessage",function(message) { 
    console.log("New Message",message)
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    
    jQuery('#messages').append(li);
});
// socket.emit("createMessage",{from:"Frank",text:"Hi"},
//     function(data){console.log("Got it!",data)})

jQuery("#message-form").on("submit", function(e){
    e.preventDefault();//prevents default event behavior //default submit event refreshes page
    socket.emit("createMessage", {
        // from : "User", text : "COOL"//jQuery(["name=message"]).val()
        from : "User", text : jQuery("[name=message]").val()
    }, function(){
        
    });
});    



