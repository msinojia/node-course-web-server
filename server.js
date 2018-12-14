const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.originalUrl}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });

  next();
});


// app.use((req, res, next) => {
//     res.render('maintenance');
// });


app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.render('home', {
    heading: 'Home Page',
    welcomeMessage: 'Hi User!'
  });
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.get('/about', (req, res) => {
  res.render('about', {
    heading: 'About Page'
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Invalid input(s)',
    statusCode: 400
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
