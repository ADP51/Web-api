var express = require("express");
var bodyParser = require("body-parser");
var app = express();

//assigning all my filepaths to my routes
var storeRoutes = require("./routes/stores");
var productsRoutes = require("./routes/products");
var orderRoutes = require("./routes/orders");
var lineitemsRoutes = require("./routes/lineitems");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//index route
app.get("/", function(req, res){
    res.send("Hello"); 
});

//use all the routes
app.use("/stores", storeRoutes);
app.use("/stores", productsRoutes);
app.use("/stores", orderRoutes);
app.use("/stores", lineitemsRoutes);


// all other requests redirect to 404
app.all("*", function (req, res, next) {
    res.send('page not found');
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});