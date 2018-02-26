const routes = require('./routes')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 7000));

  // Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// Process application/json
app.use(bodyParser.json());

//rendering ejs pages
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../../views');

//static
app.use('/scripts',express.static(__dirname + '/../../static/js'));
app.use('/styles',express.static(__dirname + '/../../static/css'));
app.use('/img',express.static(__dirname + '/../../static/img'));
app.use('/font-awesome',express.static(__dirname + '/../../static/fa'));
app.use('/static', express.static(__dirname + '/../../static'));
app.use('/robots.txt', express.static(__dirname + '/../../static/robots.txt'));

// Routes
app.use('/', routes);

module.exports = app;