var express = require('express');
var router = express.Router();
var connection = require("../models/dbconnection");

//********************************************************
//These are all the RESTful routs with crud for orders
//********************************************************
//get all route
router.get("/:storeId/orders", function(req, res){
    //using the store ID in the params to identify orders for that store and return all
    var q = 'SELECT * FROM orders WHERE store_id = ?';
    connection.query(q, req.params.storeId, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });  
});

//create route
router.post("/:storeId/orders", function(req,res){
    //store all the values for the new order in a var "q"
    var q = {
        total_price: req.body.total_price,
        store_id: req.params.storeId
    }
    //pass the var q into a SQL query to our database to create a new entry into our db
    connection.query('INSERT INTO orders SET ?', q, function(error, results){
        if(error) throw error;
        res.json(results);
        res.redirect("/stores/:storeId/orders");
    });
});

//read route
router.get("/:storeId/orders/:orderId", function(req,res){
    //query the database for orders belonging to this store with params from the route
    connection.query("SELECT * FROM orders WHERE id = ?", req.params.orderId, function(error, results) {
        if(error) throw error;
        res.json(results[0]);
    }); 
});

//update route
router.put("/:storeId/orders/:orderId", function(req,res){
    //update at the id passed by params
    connection.query("UPDATE orders SET total_price = ?, store_id = ? WHERE id = ?", [req.body.total_price, req.body.store_id, req.params.orderId], function(error, results){
        if(error) throw error;
        console.log("Order updated");
        res.json(results);
        res.redirect("/:storeId/orders");
    }); 
});

//delete route
router.delete("/:storeId/orders/:orderId", function(req,res){
    //delete the entry with the id passed through the params
   connection.query("DELETE FROM orders WHERE id = ?", req.params.orderId, function(error, results){
       if(error) throw error;
       console.log("order deleted");
       res.redirect("/:storeId/orders");
   }) 
});



module.exports = router;