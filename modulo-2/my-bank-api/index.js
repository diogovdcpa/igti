var express = require("express");
var fs = require("fs");

var app = express();

app.use(express.json());

app.post("/account", (req, res) => {
    let account = req.body;
    fs.readFile("account.json", "utf8", (err, data) => {
        if (!err) {
            try {
                let json = JSON.parse(data);
                account = { id: json.nextId++,...account };
                json.accounts.push(account);

                fs.writeFile("account.json", JSON.stringify(json), err => {
                    if (err) {
                        res.status(400).send({error: err.message});
                    } else {
                        res.end();
                    }
                });
            } catch (err) {
                res.status(400).send({error: err.message});
            }
        } else {
            res.status(400).send({error: err.message});
        }
    });
});

// iniciando o servidor

app.listen(3000, () => {

    try {

        fs.readFile("account.json", "utf8", (err, data) => {
            if (err) {
                const initialJson = {
                    nextId: 1,
                    accounts: []
                };
                fs.writeFile("account.json", JSON.stringify(initialJson), err => {
                    console.log(err);
                })
            }
        })

    } catch (err) {
        console.log(err)
    }

    console.log("START SERVER")
})
