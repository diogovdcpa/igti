var express = require("express");
var router = express.Router();
var fs = require("fs");

router.post("/", (req, res) => {
    let account = req.body;
    fs.readFile("accounts.json", "utf8", (err, data) => {
        if (!err) {
            try {
                let json = JSON.parse(data);
                account = { id: json.nextId++, ...account };
                json.accounts.push(account);

                fs.writeFile("accounts.json", JSON.stringify(json), err => {
                    if (err) {
                        res.status(400).send({ error: err.message });
                    } else {
                        res.end();
                    }
                });
            } catch (err) {
                res.status(400).send({ error: err.message });
            }
        } else {
            res.status(400).send({ error: err.message });
        }
    });
});

router.get("/", (req, res) => {
    fs.readFile("accounts.json", "utf8", (err, data) => {
        if (!err) {
            let json = JSON.parse(data);
            delete json.nextId;
            res.send(json.accounts);
        } else {
            res.status(400).send({ error: err.message });
        }
    });
});

router.get("/:id", (req, res) => {

    fs.readFile(global.fileName, "utf8", (err, data) => {
        try {
            if (err) throw err;

            let id = req.params.id;
            let json = JSON.parse(data);
            const account = json.accounts.find(account => account.id === parseInt(id,10));

            if (account) {
                res.send(account);
            } else {
                res.end();
            }

        } catch (err) {
            res.status(400).send({ error: err.message });
        };
    });
});

router.delete("/:id",(req,res)=>{
    fs.readFile(global.fileName,"utf8",(err,data)=>{
        try {
            if(err) throw err;
            let id = req.params.id;
            let json = JSON.parse(data);
            let accounts = json.accounts.filter(account=> account.id !== parseInt(id,10));
            json.accounts = accounts;

            fs.writeFile(global.fileName, JSON.stringify(json), err => {
                if (err) {
                    res.status(400).send({ error: err.message });
                } else {
                    res.end();
                }
            });
        } catch (err) {
            res.send("erro ao deletar")
        }
    });
});

module.exports = router;