var mysql = require('mysql2')
var db_config = {
  host: 'localhost',
  user: 'betUser',
  password: '123456789.',
  database: 'rasbet',
  timezone: "Z",
  multipleStatements: true
}

var connection = mysql.createPool(db_config)

var getConnection = function(callback) {
  connection.getConnection(function(err, connection) {
      callback(err, connection);
  });
};

module.exports = getConnection;
module.exports = connection;