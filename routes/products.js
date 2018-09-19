var express = require('express');
var router = express.Router();
var connection = require("../models/dbconnection");


//get all route
router.get("/:storeId/products", function(req, res){
    console.log(req.params.storeId);
    var q = 'SELECT * FROM products WHERE store_id = ?';
    connection.query(q, req.params.storeId, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });  
});

//create route
router.post("/:storeId/products", function(req,res){
    var q = {   name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                store_id: req.params.storeId
    }
    connection.query('INSERT INTO products SET ?', q, function(error, results){
        if(error) throw error;
        res.redirect("/stores/:storeId/products")
    });
});

//read route
router.get("/:storeId/products/:prodId", function(req,res){
    connection.query("SELECT * FROM products WHERE id = ?", req.params.prodId, function(error, results) {
        if(error) throw error;
        res.json(results[0]);
    }); 
});

//update route
router.put("/:storeId/products/:prodId", function(req,res){
    var body = {    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    id: req.params.prodId
    }
    connection.query("UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?", [req.body.name, req.body.description, req.body.price, req.params.prodId], function(error, results){
        if(error) throw error;
        console.log("Product updated");
        res.redirect("/:storeId/products");
    }); 
});

//delete route
router.delete("/:storeId/products/:prodId", function(req,res){
   connection.query("DELETE FROM products WHERE id = ?", req.params.prodId, function(error, results){
       if(error) throw error;
       console.log("Product deleted");
       res.redirect("/:storeId/products");
   }) 
});



module.exports = router;