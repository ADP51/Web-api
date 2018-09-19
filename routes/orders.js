var express = require('express');
var router = express.Router();
var connection = require("../models/dbconnection");


//get all route
router.get("/:storeId/orders", function(req, res){
    var q = 'SELECT * FROM orders WHERE store_id = ?';
    connection.query(q, req.params.storeId, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });  
});

//create route
router.post("/:storeId/orders", function(req,res){
    var q = {
        total_price: req.body.total_price,
        store_id: req.params.storeId
    }
    connection.query('INSERT INTO orders SET ?', q, function(error, results){
        if(error) throw error;
        res.redirect("/stores/:storeId/orders")
    });
});

//read route
router.get("/:storeId/orders/:orderId", function(req,res){
    connection.query("SELECT * FROM orders WHERE id = ?", req.params.orderId, function(error, results) {
        if(error) throw error;
        res.json(results[0]);
    }); 
});

//update route
router.put("/:storeId/orders/:orderId", function(req,res){
    connection.query("UPDATE orders SET total_price = ?, store_id = ? WHERE id = ?", [req.body.total_price, req.body.store_id, req.params.orderId], function(error, results){
        if(error) throw error;
        console.log("Order updated");
        res.redirect("/:storeId/orders");
    }); 
});

//delete route
router.delete("/:storeId/orders/:orderId", function(req,res){
   connection.query("DELETE FROM orders WHERE id = ?", req.params.orderId, function(error, results){
       if(error) throw error;
       console.log("order deleted");
       res.redirect("/:storeId/orders");
   }) 
});



module.exports = router;