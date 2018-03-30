var mysql = require('mysql');

var con = function() {
        return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456",
        database: "nodejs"
    });
}

module.exports = con;
