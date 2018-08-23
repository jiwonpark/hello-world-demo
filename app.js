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
    getAllFruits().then(result => res.send('Hello World of Fruits! ' + result));
});

app.listen(8081, () => console.log('Example app listening on port 8081!'));
