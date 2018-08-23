const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, './public')));
hbs.registerPartials(path.join(__dirname, './views/partials'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Ironbeers'
    });
});
app.get('/beers', (req, res) => {
    punkAPI
        .getBeers()
        .then(punkAPIBeers => {
            let data = {
                beersforView: punkAPIBeers
            };
            res.render('beers', data);
        })
        .catch(error => {
            console.log(error);
        });
});
app.get('/random-beer', (req, res) => {
    punkAPI
        .getRandom()
        .then(beers => {
            console.log(beers);
            res.render('random-beer', {
                beers
            });
        })
        .catch(error => {
            console.log(error);
        });
});
app.listen(3000);
