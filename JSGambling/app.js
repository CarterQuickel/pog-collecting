const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('./db/scores.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// home page
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});