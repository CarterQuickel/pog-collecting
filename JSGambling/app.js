const express = require('express');
const app = express();

app.use('/static', express.static('static'));

app.use(express.static('static'));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

app.set('view engine', 'ejs');
app.set('trust proxy', true);

app.use(express.urlencoded({ extended: true }));

// home page
app.get('/', (req, res) => {
    res.render('index');
});