var express = require('express');
var sql = require("mssql");

var dbConfig = {
    server: "rohannevrikar.database.windows.net",
    database: "PlacementDB",
    user: "rohannevrikar",
    password: "sit@Placement",
    options: {
        encrypt: true
    }
};

var conn = new sql.ConnectionPool(dbConfig);
conn.connect().then(function () {

}).catch(function (err) {
    console.log(err);
    conn.close();
});

module.exports = conn;