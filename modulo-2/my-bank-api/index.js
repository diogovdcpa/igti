var express = require("express");

var app = express();

app.get("/",(req,res)=>{
    res.send("GET");
})

app.listen(3000,()=>{
    console.log("SERVER")
})
