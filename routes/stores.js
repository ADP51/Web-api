var express = require('express');
var router = express.Router();
var connection = require("../models/dbconnection");

//*****************
//STORE ROUTES
//*****************
//get all stores
//query the db for all stores
router.get("/", function(req, res){
    var q = 'SELECT * FROM stores ';
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });   
});

//create a store route
//take all info in req.body and add into the db by passing it to my db.query
router.post("/", function(req,res){
    var store = {name: req.body.name};
    console.log(req.body.name);
    connection.query("INSERT INTO stores SET ?", store, function(error, results){
         console.log(error);
         res.json("results");
    });
});

//read route
//find a specific store by passing req.params.id to my db.query
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
//update the store at the req.params.id and pass it all the values from req.body
router.put("/", function(req,res){
    connection.query("UPDATE stores SET name = ? WHERE id=?", [req.body.name, req.body.id], function(error, results, fields) {
            if(error) throw error;
            res.end(JSON.stringify(results));
    });
});

//DELETE ROUTE
//delete the store at a specific id passed by req.params.id
router.delete("/", function(req, res){
    console.log(req.body.id);
    connection.query("DELETE FROM stores WHERE id = ?", req.body.id, function(error, results){
        if(error) throw error;
        res.send("Store Deleted");
    }); 
});

module.exports = router;