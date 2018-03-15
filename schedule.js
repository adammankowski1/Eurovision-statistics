var MongoClient = require('mongodb').MongoClient;
var api = require('./api.js');

MongoClient.connect(process.env.database_url, async (err,db) => {
  if(err) throw err;
  const dbo = db.db(process.env.database_name);
  const results = await api.retrieveResults();
  dbo.collection('eurovision_hourly_stats').insertMany(results, (err, res) => {
    if(err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  })
});
