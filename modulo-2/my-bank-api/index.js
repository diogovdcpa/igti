var express = require("express");
var fs = require("fs");

var app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("GET");
})

app.post("/account",(req,res)=>{
    console.log("post account")
    let params = req.body;

    fs.writeFile("account.js",JSON.stringify(params),err=>{
        console.log(err);
    })

    res.send("post account")
})

app.listen(3000,()=>{
    console.log("SERVER")
})
