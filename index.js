var express = require('express');
var app = express();
var api = require('./api.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/api', async function(request, response) {
  const results = await api.retrieveResults();
  response.send(results);
});

app.get('/api/daily', async function(request, response) {
  const results = await api.retrieveDailyStats((results) => {
    response.send(results);
  });
});

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
