exports.MIN_DAILY_DATE = "min_daily_date";
exports.MAX_DAILY_DATE = "max_daily_date";

exports.retrieveDate = function getFormattedDate(dateType) {
  var date = new Date();
  if(dateType == exports.MIN_DAILY_DATE)
    date.setUTCHours(0, 0, 0, 0);
  else if(dateType == exports.MAX_DAILY_DATE)
    date.setUTCHours(24, 0, 0, 0);
  return date.toISOString();
}
