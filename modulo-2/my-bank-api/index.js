var express = require("express");
var fs = require("fs");
var app = express();
var accountsRouter = require("./routes/accounts.js")

app.use(express.json());
app.use("/account",accountsRouter);

global.fileName = "accounts.json";

// iniciando o servidor

app.listen(3000, () => {

    try {

        fs.readFile(global.fileName, "utf8", (err, data) => {
            if (err) {
                const initialJson = {
                    nextId: 1,
                    accounts: []
                };
                fs.writeFile(global.fileName, JSON.stringify(initialJson), err => {
                    console.log(err);
                })
            }
        })

    } catch (err) {
        console.log(err)
    }

    console.log("START SERVER")
})
