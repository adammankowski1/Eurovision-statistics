var request = require('request-promise-native');
var MongoClient = require('mongodb').MongoClient;
var api = require('./api.js');
var countries = require('./countries.js');
var utils = require('./utils.js');


const url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=';

/*
  Returns Youtube API Video Stats

  @param {array} Array of yt video ids
  @return {array} Array of returned body objects (JSON.parsed)
*/
async function getVideoStatsByIds(ids) {
  /* 
    Youtube api statistic max ids per request = 49.
    We need to split it into multiple requests if we have more than 49 ids to check
  */
  let chunks = [];
  for (let i = 0; i < ids.length; i += 49)
    chunks.push(ids.slice(i, i + 49));

  let results = [];
  for (const chunk of chunks) {
    const urlWithChunk = url + chunk.toString() + `&key=${process.env.youtube_api_key}`;
    await request(urlWithChunk, function (error, response, body) {
      results.push(JSON.parse(body));
    });
  }
  return results;
}

/*
  As we fetch multiple videos which matches one country we need to merge them
  
  @param {array} parsedResults Parsed results [{country1}, {country2} ...]
  @return {array} Merged results
*/
function mergeDoubledVideos(parsedResults) {
  let merged = [];
  for(result of parsedResults) {
    const foundIndex = merged.findIndex(element => {
      return element.country == result.country;
    });
    if(foundIndex != -1) {
      merged[foundIndex].views += result.views;
      merged[foundIndex].likes += result.likes;
      merged[foundIndex].dislikes += result.dislikes;
      merged[foundIndex].comments += result.comments;
    } else {
      merged.push(result);
    }
  }
  return merged;
}

exports.retrieveResults = async function() {
  const filteredCountries = countries.getFiltered();

  let currentTime = new Date();
  currentTime.setUTCHours(currentTime.getUTCHours(), 0, 0, 0);
  const results = await getVideoStatsByIds(filteredCountries);
  const parsedResults = results.map(chunk => {
    return chunk.items.map((item, index) => {
      return { country: countries.getCountryNameByVideoId(item.id), views: parseInt(item.statistics.viewCount), likes: parseInt(item.statistics.likeCount), dislikes: parseInt(item.statistics.dislikeCount), comments: parseInt(item.statistics.commentCount), id: item.id, time: currentTime.toISOString() };
    });
  });

  return mergeDoubledVideos([].concat(...parsedResults));
}

exports.retrieveDailyStats = async function(callback) {
  MongoClient.connect(process.env.database_url, async (err,db) => {
    if(err) throw err;
    const dbo = db.db(process.env.database_name);
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
