var socket = io();  
socket.on("connect",function(){
    console.log("Connected to server")
});
socket.on("disconnect",function(){console.log("Disconnected from server")});
socket.on("newMessage",function(message) { 
    var formattedTime = moment(message.createdAt).format("h:mm a")
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template,{
        text : message.text,
        from : message.from,
        createdAt : formattedTime
    });
    jQuery("#messages").append(html);


});
socket.on("newLocationMessage",function(message) {
    var formattedTime=moment(message.createdAt).format("h:mm a");
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template, {
        url : message.url,
        from : message.from,
        createdAt : formattedTime
    });
    jQuery("#messages").append(html);
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>')
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery("#messages").append(li);
})

jQuery("#message-form").on("submit", function(e){
    e.preventDefault();//prevents default event behavior //default submit event refreshes page
    var messageTextbox =  jQuery("[name=message]");
    socket.emit("createMessage", {
        from : "User", text : messageTextbox.val()
    }, function(){
        messageTextbox.val(""); //cleat the val
    });
});    


//******************************************************************************send-location
//**************************************************************onclick listener
var locationButton = jQuery("#send-location");
locationButton.on("click",function(){
   if(!navigator.geolocation){
       return alert("Geolocation not supported by your browser")
   } 
   
   locationButton.attr("disabled", "disabled").text("Sending location..."); //remove button while waiting for response
   
   navigator.geolocation.getCurrentPosition(function(position){
       locationButton.removeAttr("disabled").text("Send location"); //renable button after success
       socket.emit("createLocationMessage",{
           latitude : position.coords.latitude, 
           longitude : position.coords.longitude 
           })
   },function(err){
       alert("Unable to fetch location");
       locationButton.removeAttr("disabled").text("Send location");  //reenable button if error      
   });
});