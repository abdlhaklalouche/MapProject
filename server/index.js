const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const db = require('./database');

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))

// Routes
app.use('/villes', require('./routes/villes'));
app.use('/communes', require('./routes/communes'));
app.use('/categories', require('./routes/categories'));

app.listen(port, () => console.log(`Server listening on port ${port}!`))