const express = require('express');
const app = express();

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

var createTable = function() {
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

var insert = function(id, name) {
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

var getAllFruits = function() {
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

app.get('/', (req, res) => {
    getAllFruits()
    .then(result => res.send('Hello World of Fruits! ' + JSON.stringify(result)))
    .catch(error => res.send('Hello World of Fruits! ' + JSON.stringify(error)));
});

app.get('/create-table', (req, res) => {
    createTable()
    .then(result => res.send('Create table success! ' + JSON.stringify(result)))
    .catch(error => res.send('Create table failed! ' + JSON.stringify(error)));
});

app.get('/insert', (req, res) => {
    insert('111', 'banana')
    .then(result => res.send('Insert success! ' + JSON.stringify(result)))
    .catch(error => res.send('Insert failed! ' + JSON.stringify(error)));
});

app.listen(8081, () => console.log('Example app listening on port 8081!'));
