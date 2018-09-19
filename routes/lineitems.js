var express = require('express');
var router = express.Router();
var connection = require("../models/dbconnection");

//get all route
router.get("/:storeId/orders/:orderId/lineitems", function(req, res){
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
        product_id: req.body.product_id,
        order_id: req.params.orderId
    }
    connection.query('INSERT INTO lineitems SET ?', q, function(error, results){
        if(error) throw error;
        res.redirect("/stores/:storeId/orders/:orderId/lineitems");
    });
});

//read route
router.get("/:storeId/orders/:orderId/lineitems/:lineId", function(req,res){
    connection.query("SELECT * FROM lineitems WHERE id = ?", req.params.lineId, function(error, results) {
        if(error) throw error;
        res.json(results[0]);
    }); 
});

//update route
router.put("/:storeId/orders/:orderId/lineitems/:lineId", function(req,res){
    connection.query("UPDATE lineitems SET quantity = ?, linetotal = ?, product_id =? WHERE id = ?", [req.body.quantity, req.body.linetotal, req.body.product_id, req.params.lineId], function(error, results){
        if(error) throw error;
        console.log("Order updated");
        res.redirect("/:storeId/orders/lineitems/:lineId");
    }); 
});

//delete route
router.delete("/:storeId/orders/:orderId/lineitems/:lineId", function(req,res){
   connection.query("DELETE FROM lineitems WHERE id = ?", req.params.lineId, function(error, results){
       if(error) throw error;
       console.log("order deleted");
       res.redirect("/:storeId/orders/:orderId/lineitems");
   }) 
});


module.exports = router;
