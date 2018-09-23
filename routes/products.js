var express = require('express');
var router = express.Router();
var connection = require("../models/dbconnection");

//********************************************************
//These are all the RESTful routs with crud for products
//********************************************************
//get all route
router.get("/:storeId/products", function(req, res){
    console.log(req.params.storeId);
    //using the store ID in the params to identify products for that store and return all
    var q = 'SELECT * FROM products WHERE store_id = ?';
    connection.query(q, req.params.storeId, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });  
});

//create route
router.post("/:storeId/products", function(req,res){
    //store all the values for the new product in a var "q"
    var q = {   name: req.body.name,
                description: req.body.desc,
                price: req.body.price,
                store_id: req.params.storeId
    };
    //pass the var q into a SQL query to our database to create a new entry into our db
    connection.query('INSERT INTO products SET ?', q, function(error, results){
        if(error) throw error;
        res.redirect("/stores/:storeId/products")
    });
});

//read route 
router.get("/:storeId/products/:prodId", function(req,res){
    //query the database for products belonging to this store with params from the route
    connection.query("SELECT * FROM products WHERE id = ?", req.params.prodId, function(error, results) {
        if(error) throw error;
        res.json(results[0]);
    }); 
});

//update route
router.put("/:storeId/products/:prodId", function(req,res){
    connection.query("UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?", [req.body.name, req.body.description, req.body.price, req.params.prodId], function(error, results){
        if(error) throw error;
        console.log("Product updated");
        res.redirect("/:storeId/products");
    }); 
});

//delete route
router.delete("/:storeId/products/:prodId", function(req,res){
    //delete from db at the id in the params
   connection.query("DELETE FROM products WHERE id = ?", req.params.prodId, function(error, results){
       if(error) throw error;
       console.log("Product deleted");
       res.redirect("/:storeId/products");
   }) 
});



module.exports = router;