var express = require('express');
var app = express();
var countries = require('./countries.js');
var request = require('request-promise-native');

async function retrieveResults() {
  let results = [];

  let url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';

  const filteredCountries = countries().filter((country) => {
    return country.yt !== '';
  });

  filteredCountries.forEach((country, index) => {
    url += country.yt;
    if(index != filteredCountries.length - 1) {
      url += ',';
    }
  });

  url += `&key=${process.env.youtube_api_key}`;
  await request(url, function (error, response, body) {
    body = JSON.parse(body);
    body.items.forEach((item, index) => {
      results.push({country: countries()[index].name, views: item.statistics.viewCount, likes: item.statistics.likeCount, dislikes: item.statistics.dislikeCount, comments: item.statistics.commentCount});
    });
  });
  return results;
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/api', async function(request, response) {
  const results = await retrieveResults();
  response.send(results);
});

app.get('/', function(request, response) {
  response.render('pages/db');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
