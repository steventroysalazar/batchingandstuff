import express from 'express';
import mysql from 'mysql';
import cors from "cors";




const app = express();

app.use(cors());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "alluser",
//     password: "alluser",
//     database: "kantar-bpi-steventroy_trainee"
// })

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "kantar-bpi-steventroy_trainee"
});

app.use(express.json())


app.get("/", (req, res) => {
    res.json("databaseconnected");
})

app.get("/batchinfo", (req,res) => {
     const q = "SELECT * FROM batch_tbl";
     db.query(q,(err,data)=> {
        if(err) { 
            return res.json(err)
        }
        return res.json(data);
     })
})

app.post("/batchinfo", (req, res) => {
    const q = "INSERT INTO batch_tbl(`batch_info_id`, `img_name`, `new_image`, `location`) VALUES (?)";

    const values = [
        req.body.batch_info_id,
        req.body.img_name,
        req.body.new_image,
        req.body.location,

        // "title from ",
        // "des from",
        // "reaaf from",
        // "dadwad from"
    ];

    db.query(q, [values], (err,data) => {
        if(err) return res.send(err);
        return res.json(data);
    });
});

app.delete("/batchinfo/:_id", (req,res)=>{
    const batchId = req.params.id;

    const q = " DELETE FROM batch_tbl WHERE id = ? ";

    db.query (q, [batchId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    })
});

// app.put("batchinfo/:_id", (req, res) => {
//     const batchId = req.params.id;
//     const q = "UPDATE batch_tbl SET `batch_info_id`= ?, `img_name`= ?, `new_image`= ? , `location`= ?, WHERE id= ?";

//     const values = [
//             req.body.batch_info_id,
//             req.body.img_name,
//             req.body.new_image,
//             req.body.location,
//     ];

//     db.query(q, [...values,bookId], (err, data) => {
//         if (err) return res.send(err);
//         return res.json(data);
//       });
//     });

    
    app.put("/batchinfo/:id", (req, res) => {
        const batchId = req.params.id;
        const q = "UPDATE batch_tbl SET `batch_info_id`= ?, `img_name`= ?, `new_image`= ?, `location`= ? WHERE id = ?";
      
        const values = [
            req.body.batch_info_id,
            req.body.img_name,
            req.body.new_image,
            req.body.location,
        ];
      
        db.query(q, [...values,batchId], (err, data) => {
          if (err) return res.send(err);
          return res.json(data);
        });
      });

// login

app.post("/login", (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;

        if (username && password) {
          const query = `SELECT * FROM user_tbl WHERE username = "${username}"`;

            db.query(query, (err,data) => {
                if (data.length > 0){
                    for(var count = 0; count < data.length; count ++){
                        if(data[count].password == password){
                            req.params.id = data[count].id;
                            
                           res.redirect("/");
                          // res.send('logged in')
                        }
                        // else{
                        //     res.send('Incorrect password');
                        // }
                    }
                }
                else {
                    res.status(201);
                }
                res.end();
            })
        }else{
            res.status(201)
            res.end();
        }
    
});

app.listen(8000, () => {
    console.log ('api is working'); 
})