var mysql = require('mysql');

//wrapper
function createDbConnection(){
    return mysql.createConnection({
        host:       'localhost',
        user:       'root',
        password:   '',
        database:   'questionariodb'
    });
}

module.exports = function(){
    return createDbConnection;
}