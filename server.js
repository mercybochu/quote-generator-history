
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let history = [];

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.quotable.io/random');

        const quote = response.data.content;
        const author = response.data.author;

        history.unshift({ quote, author });

        res.render('index', {
            quote,
            author,
            history
        });

    } catch (error) {
        res.send('Error fetching quote');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
