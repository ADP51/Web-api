var express = require('express');
var router = express.Router();
var connection = require("../models/dbconnection");

//*****************
//STORE ROUTES
//*****************
//get all stores
router.get("/", function(req, res){
    var q = 'SELECT * FROM stores ';
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });   
});

//create a store route
router.post("/", function(req,res){
    var store = {name: req.body.name};
    console.log(store);
    connection.query("INSERT INTO stores SET ?", store, function(error, results){
         console.log(error);
         res.redirect("/stores");
    });
});

//read route
router.get("/:id", function(req,res){
    var q = req.params.id;
    
    console.log(q);
    connection.query("SELECT * FROM stores WHERE id = ?", q, function(err, results){ 
        if(err) console.log(err);
        console.log(results[0]);
        res.json(results[0]);
    });
});

//UPDATE ROUTE
router.put("/", function(req,res){
    connection.query("UPDATE stores SET name = ? WHERE id=?", [req.body.name, req.body.id], function(error, results, fields) {
            if(error) throw error;
            res.end(JSON.stringify(results));
    });
});

//DELETE ROUTE
router.delete("/", function(req, res){
    console.log(req.body.id);
    connection.query("DELETE FROM stores WHERE id = ?", req.body.id, function(error, results){
        if(error) throw error;
        res.end(JSON.stringify(results));
    }); 
});

module.exports = router;