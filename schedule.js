var MongoClient = require('mongodb').MongoClient;
var api = require('./api.js');
var url = "mongodb://eurovision_base:siemaczesc123@ds213199.mlab.com:13199/heroku_kgnnt30f";
var databaseName = "heroku_kgnnt30f";


MongoClient.connect(url, async (err,db) => {
  if(err) throw err;
  const dbo = db.db(databaseName);
  const results = await api.retrieveResults();
  dbo.collection('eurovision_hourly_stats').insertMany(results, (err, res) => {
    if(err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  })
});
