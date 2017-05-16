const path = require("path");
const express = require("express")

const publicPath = path.join(__dirname, "../public")
var app = express();
const port = process.env.PORT || 3000
app.use(express.static(publicPath));

// console.log(__dirname + "/../public")
// console.log(publicPath)
// console.log(publicPath + "/index.html")
// var indexHtml = publicPath + "/index.html";
// console.log(indexHtml)


// app.get("/",(req,res)=>{res.sendFile(indexHtml)})
// app.get("/",(req,res)=>{res.send("HI")})
// app.get("/",(req,res)=>{res.sendFile(publicPath + "/index.html")})

// app.listen(process.env.PORT, process.env.IP, ()=>{
app.listen(port, process.env.IP, ()=>{
    console.log("Server started on ",process.env.PORT, process.env.IP);
})