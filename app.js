const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const http = require('http');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));
app.get('/', (req, res) => {
    res.sendFile(index.html);
});
// app.use(express.static(path.join(__dirname, 'src')));

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const url =
  "mongodb+srv://admin:S7125s7125@cluster0.krcz6mp.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(url, { useNewUrlParser: true });



  // Working Code for finding a query in Mongo database
//     var result;
//   // Use connect method to connect to the server
//   client.connect(function(err,db) {
//     if (err) throw err;
//     console.log("Connected successfully to server");
//     var dbo = db.db("sample_mflix");
//   var query = { name: "Robb Stark" };
//   dbo.collection("users").findOne(query, function(err, res) {
//     if (err) throw err;
//     result=res;
//     console.log(result);
//     db.close();
//   });
//   });
 


app.post('/signup',(req,res)=>{
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("myDB");
        
        var myobj = { username: req.body.txt,email :req.body.email, password: req.body.pswd };
        dbo.collection("users").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 user inserted");
          db.close();
        });
      });
    res.send("Success");
})

app.get('/login',(req,res)=>{
    client.connect(function(err,db) {
            if (err) throw err;
            console.log("Connected successfully to server");
            var dbo = db.db("myDB");
            var query = { email: req.body.email, password: req.body.pswd };
          dbo.collection("users").findOne(query, function(err, res) {
            if (err) throw err;
            
            console.log("Logged in successfully");
            db.close();
          });
          });
    res.send("Logged in successfully");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});