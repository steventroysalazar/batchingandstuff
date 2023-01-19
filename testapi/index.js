const express = require ("express");

const mysql = require ("mysql");

// create connection

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "testdatabase"

});

db.connect((err) => {
    if(err) {
        throw err;
    }

    console.log("Mysql connected");
});

const app = express();


//Create DB
app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE testerito";

    db.query(sql, (err) => {
        if (err) {
            throw err;
        }

        res.send("Database created");
    });
});

//Create Table

app.get("/createProduct", (req, res) => {
    let sql = "CREATE TABLE product(id int AUTO_INCREMENT, name VARCHAR(255), Title VARCHAR(255),Quantity INT(11),Message VARCHAR(255), City VARCHAR(255),  PRIMARY KEY(ID))";

    db.query(sql,(err) => {
        if (err) {
            throw err;
        }

        res.send("Product Table created");
    })
});


// Insert Product1 

app.get ("/product1", (req,res) => {
    let post = {
        name: "test323321321",
        Title: "TESTING1111",
        Quantity: "235534",
        Message: "testmessadasage",
        City: "testcitydsada"
    };
    let sql = "INSERT INTO product SET ?";

    let query = db.query(sql, post, (err) => {
        if (err) {
            throw err;
        }

        res.send("product 1 added");
    });
});

//update product

app.get("/updateProduct/:id", (req,res) => {
    let newName = "Updated name";

    let sql = `UPDATE product SET name = '${newName}' WHERE id ={req.params.id}`;

    let query = db.query(sql,(err) => {
        if (err) {
            throw err;
        }

        res.send("Post updated..");
    })   
});

app.get("/deleteProduct/:id", (req, res) => {
    let sql = `DELETE FROM product WHERE id = ${req.params.id}`;

    let query = db.query(sql,(err) => {
        if (err) {
            throw err;
        }

        res.send("Product deleted");
    })
})



app.listen("3000", () => {
    console.log("server started on port 3000");
});

