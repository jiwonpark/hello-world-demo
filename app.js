const express = require('express');
const app = express();

var rdbManager = require('./rdbManager.js');

app.get('/', (req, res) => {
    rdbManager.getAllFruits()
    .then(result => res.send('Hello World of Fruits! ' + JSON.stringify(result)))
    .catch(error => res.send('Hello World of Fruits! ' + JSON.stringify(error)));
});

app.get('/create-table', (req, res) => {
    rdbManager.createTable()
    .then(result => res.send('Create table success! ' + JSON.stringify(result)))
    .catch(error => res.send('Create table failed! ' + JSON.stringify(error)));
});

app.get('/insert', (req, res) => {
    rdbManager.insert('111', 'banana')
    .then(result => res.send('Insert success! ' + JSON.stringify(result)))
    .catch(error => res.send('Insert failed! ' + JSON.stringify(error)));
});

app.listen(8081, () => console.log('Example app listening on port 8081!'));
