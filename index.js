var express = require('express');
var app = express();
var countries = require('./countries.js');
var request = require('request');

function retrieveResults() {
  let results = [];

  countries().forEach((country) => {
    if(country.yt == '')
      return;

    request('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=yfUJ2eDm6ng&key=AIzaSyD3mW7_XpOdbeMt0NLRCalpqtGsgKKTVuQ', function (error, response, body) {
      body = JSON.parse(body);
      results.push({ views: body.items[0].statistics.viewCount, likes: body.items[0].statistics.likeCount, dislikes: body.items[0].statistics.likeCount, comments: body.items[0].statistics.commentCount});
    });
  });
  return results;
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  const results = retrieveResults();
  response.render(results);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
