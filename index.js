var express = require('express');
var path = require('path');
var app = express();
var api = require('./api.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist2'));

app.get('/api', async function(request, response) {
  const results = await api.retrieveResults();
  response.send(results);
});

app.get('/api/daily', async function(request, response) {
  const results = await api.retrieveDailyStats((results) => {
    response.send(results);
  });
});

app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname, '/dist2/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
