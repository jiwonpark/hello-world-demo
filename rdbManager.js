var mysql = require('mysql');

var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 100
});

const CREATE_TABLE_STATEMENT =
    "CREATE TABLE fruit (" +
    "    id varchar(256) PRIMARY KEY," +
    "    name varchar(256) NOT NULL" +
    ");";

const INSERT_STATEMENT = "INSERT INTO fruit (id, name) VALUES (?, ?);";

module.exports.createTable = function() {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(error, connection) {
            if (error) {
                reject(error);
                return;
            }

            connection.query(CREATE_TABLE_STATEMENT, function(error, result) {
                connection.release();

                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    });
};

module.exports.insert = function(id, name) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(error, connection){
            if (error)
                reject(error);

            connection.query(INSERT_STATEMENT, [id, name], function(error, result) {
                connection.release();

                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    });
};

module.exports.getAllFruits = function() {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(error, connection) {
            if (error) {
                reject(error);
                return;
            }

            connection.query('SELECT * FROM fruit;', function(error, result) {
                connection.release();

                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    });
};
