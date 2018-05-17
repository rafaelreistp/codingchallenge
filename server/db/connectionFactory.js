var mysql = require('mysql');

//wrapper
function createDbConnection(){
    return mysql.createConnection({
        host:       'localhost',
        user:       'root',
        password:   'root',
        database:   'questionariodb'
    });
}

module.exports = function(){
    return createDbConnection;
}