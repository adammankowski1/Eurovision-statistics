var countries = require('./countries.js');
var request = require('request-promise-native');

exports.retrieveResults = async function() {
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
      var currentTime = new Date();
      if(index < 24)
        currentTime.setHours(index);
      currentTime.setMinutes(0);
      currentTime.setSeconds(0);
      currentTime.setMilliseconds(0);
      results.push({country: filteredCountries[index].name, views: item.statistics.viewCount, likes: item.statistics.likeCount, dislikes: item.statistics.dislikeCount, likesRatio: (item.statistics.likeCount / item.statistics.dislikeCount).toFixed(2), comments: item.statistics.commentCount, id: item.id, time: currentTime.toISOString()});
    });
  });
  return results;
}
