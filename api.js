var request = require('request-promise-native');
var MongoClient = require('mongodb').MongoClient;
var api = require('./api.js');
var countries = require('./countries.js');
var utils = require('./utils.js');
var url = "mongodb://eurovision_base:siemaczesc123@ds213199.mlab.com:13199/heroku_kgnnt30f";
var databaseName = "heroku_kgnnt30f";

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
    let currentTime = new Date();
    currentTime.setUTCHours(currentTime.getUTCHours(), 0, 0, 0);
    body.items.forEach((item, index) => {
      results.push({country: filteredCountries[index].name, views: parseInt(item.statistics.viewCount), likes: parseInt(item.statistics.likeCount), dislikes: parseInt(item.statistics.dislikeCount), comments: parseInt(item.statistics.commentCount), id: item.id, time: currentTime.toISOString()});
    });
  });
  return results;
}

exports.retrieveDailyStats = async function(callback) {
  MongoClient.connect(url, async (err,db) => {
    if(err) throw err;
    const dbo = db.db(databaseName);
    dbo.collection('eurovision_hourly_stats').find({"time" : { $gte: utils.retrieveDate(utils.MIN_DAILY_DATE), $lte: utils.retrieveDate(utils.MAX_DAILY_DATE) }}).toArray(function(err, result) {
      if (err) throw err;
      let results = {};
      result.forEach((item) => {
        if(!results[item.country])
          results[item.country] = { viewsMin: item.views, viewsMax: item.views, likesMin: item.likes, likesMax: item.likes, dislikesMin: item.dislikes, dislikesMax: item.dislikes, commentsMin: item.comments, commentsMax: item.comments };
        if(results[item.country].viewsMin > item.views)
          results[item.country].viewsMin = item.views;
        if(results[item.country].viewsMax < item.views)
          results[item.country].viewsMax = item.views;

        if(results[item.country].likesMin > item.likes)
          results[item.country].likesMin = item.likes;
        if(results[item.country].likesMax < item.likes)
          results[item.country].likesMax = item.likes;

        if(results[item.country].dislikesMin > item.dislikes)
          results[item.country].dislikesMin = item.dislikes;
        if(results[item.country].dislikesMax < item.dislikes)
          results[item.country].dislikesMax = item.dislikes;

        if(results[item.country].commentsMin > item.comments)
          results[item.country].commentsMin = item.comments;
        if(results[item.country].commentsMax < item.comments)
          results[item.country].commentsMax = item.comments;
      });
      let finalResults = [];
      for (let _result in results) {
        finalResults.push({country: _result, views: results[_result].viewsMax - results[_result].viewsMin , likes: results[_result].likesMax - results[_result].likesMin, dislikes: results[_result].dislikesMax - results[_result].dislikesMin, comments: results[_result].commentsMax - results[_result].commentsMin});
      }
      callback(finalResults);
      db.close();
    });
  });
}
