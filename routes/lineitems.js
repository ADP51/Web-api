var express = require('express');
var router = express.Router();
var connection = require("../models/dbconnection");

//********************************************************
//These are all the RESTful routs with crud for lineitems
//********************************************************
//get all route
router.get("/:storeId/orders/:orderId/lineitems", function(req, res){
    //storing the query in a var then using req.params.orderId to get all lineitems for this order
    var q = 'SELECT * FROM lineitems WHERE order_id = ?';
    connection.query(q, req.params.orderId, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });  
});

//create route
router.post("/:storeId/orders/:orderId/lineitems", function(req,res){
    var q = {
        quantity: req.body.quantity,
        linetotal: req.body.linetotal,
        order_id: req.params.orderId,
        product_id: req.body.product_id
        
    }
    connection.query('INSERT INTO lineitems SET ?', q, function(error, results){
        if(error) throw error;
        res.redirect("/stores/:storeId/orders/:orderId/lineitems");
    });
});

//read route
router.get("/:storeId/orders/:orderId/lineitems/:lineId", function(req,res){
    //Use the req.params.lineId to find a specific lineitem and show it
    connection.query("SELECT * FROM lineitems WHERE id = ?", req.params.lineId, function(error, results) {
        if(error) throw error;
        res.json(results[0]);
    }); 
});

//update route
router.put("/:storeId/orders/:orderId/lineitems/:lineId", function(req,res){
    //take the incoming info in body and use it to update my db at the req.params.lineId
    connection.query("UPDATE lineitems SET quantity = ?, linetotal = ?, order_id= ?, product_id =? WHERE id = ?", 
        [req.body.quantity, req.body.linetotal, req.body.order_id, req.body.product_id, req.params.lineId], 
        function(error, results){
            if(error) throw error;
            console.log("Order updated");
            res.redirect("/:storeId/orders/lineitems/:lineId");
    }); 
});

//delete route
//delete the entry in our db at the lineId passed from req.params
router.delete("/:storeId/orders/:orderId/lineitems/:lineId", function(req,res){
   connection.query("DELETE FROM lineitems WHERE id = ?", req.params.lineId, function(error, results){
       if(error) throw error;
       console.log("order deleted");
       res.redirect("/:storeId/orders/:orderId/lineitems");
   }) 
});


module.exports = router;
