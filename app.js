const express = require('express');
const app = express();

var bodyParser = require('body-parser');

var rdbManager = require('./rdbManager.js');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/fruit', (req, res) => {
    rdbManager.getAllFruits()
    .then(result => res.send(result))
    .catch(error => {
        res.status(500).send('Error');
        console.log(JSON.stringify(error));
    });
});

// app.get('/create-table', (req, res) => {
//     rdbManager.createTable()
//     .then(result => res.send('Create table success! ' + JSON.stringify(result)))
//     .catch(error => res.send('Create table failed! ' + JSON.stringify(error)));
// });

app.post('/fruit', (req, res) => {
    if (!req.body || !req.body.id) {
        res.status(400).send('Error : id is mandatory');
        return;
    }

    if (!req.body.name) {
        res.status(400).send('Error : name is mandatory');
        return;
    }

    rdbManager.insert(req.body.id, req.body.name)
    .then(result => res.send('Success'))
    .catch(error => {
        res.status(500).send('Error');
        console.log(JSON.stringify(error));
    });
});

app.listen(8081, () => console.log('Example app listening on port 8081!'));
