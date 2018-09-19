var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ap51',
  database : 'my_store'
});


connection.connect();
 

 
module.exports = connection;