const countries = [
  { name: 'Poland', yt: [ 'yfUJ2eDm6ng', 'OxhC7onQkPI' ] },
  { name: 'Estonia', yt: '76KOUIfDry8' },
  { name: 'Finland', yt: [ 'y4xlvh6qW6M', 'eEeIeQ-j2zk' ] },
  { name: 'Spain', yt: 'nO4mDiJRH6Q' },
  { name: 'Netherlands', yt: [ 'kLL9IlQ_7OA', '8TowcElmyek' ] },
  { name: 'Germany', yt: [ 'o_xTETHwIQg','Evx0aAF79-E' ] },
  { name: 'Italy', yt: [ 'zguJGdoPPnw', 'gs2n5JY0QzQ' ] },
  { name: 'France', yt: 'dHb-gWC-WTc' },
  { name: 'Ukraine', yt: 'E1yoAtjhkzQ' },
  { name: 'United Kingdom', yt: [ 'K--kIdOpbJM', 'hjECy58BTJtw' ] },
  { name: 'Latvia', yt: [ 'uBlZsGxeXk4', 'tPGDNPWZGFw' ] },
  { name: 'Romania', yt: [ 'nK7ggCjA98g', 'lZp6QwWDQ4c' ] },
  { name: 'Hungary', yt: ['6unRU5ZHbqY', 'w00c8KbQIME' ] },
  { name: 'Moldova', yt: [ 'pKLKeVC-9Y4', 'Kg3ecHrFM_4' ] },
  { name: 'Serbia', yt: 'WkOFnIjGrkw' },
  { name: 'Malta', yt: [ 'E_0ugf0eP1Q', 'oyrC8jJ8eb8' ] },
  { name: 'Slovenia', yt: 'Y-Q4Fh54wUk' },
  { name: 'Switzerland', yt: [ 'YLWDqy1DnP0', 'jXOlPGnkZFY' ] },
  { name: 'Czech Republic', yt: '9zZPB3y70oU' },
  { name: 'Belarus', yt: 'YU2My4BPX34' },
  { name: 'Azerbaijan', yt: 'kWomOdDGwMM' },
  { name: 'Greece', yt: 'z6hvV9-Gi_w' },
  { name: 'Denmark', yt: 'XeraDSzu0nw' },
  { name: 'San Marino', yt: 'ZNflc1Zcw2A' },
  { name: 'Iceland', yt: 'nloweviD_90' },
  { name: 'Montenegro', yt: 'qxJoxbo9lCQ' },
  { name: 'Albania', yt: [ 'E7t4mu0tmWc', 'o-i2Rjbq8nw' ] },
  { name: 'Georgia', yt: 'TuCZMdfBqm4' },
  { name: 'Austria', yt: 'I8MyztgOTv8' },
  { name: 'Armenia', yt: 'olpi6UGmm_Y' },
  { name: 'Cyprus', yt: 'eDSgs6syrgg' },
  { name: 'Ireland', yt: 'XAEjQXzW4Uc' },
  { name: 'Bulgaria', yt: 'Uvy_R3fTHQ4' },
  { name: 'Sweden', yt: 'U2UmYBkszOA' },
  { name: 'Australia', yt: 'J4XZxbrvepw' },
  { name: 'Russia', yt: 'bgBwbr_fUxA' },
  { name: 'Belgium', yt: '6DGf9TMehi0' },
  { name: 'Israel', yt: 'CziHrYYSyPc' },
  { name: 'Croatia', yt: '19Yo86KCd0w' },
  { name: 'Norway', yt: [ 'Mvxni-WcD9A', 'oicLsTZRp28' ] },
  { name: 'Portugal', yt: 'kaVp4El9p3s' },
  { name: 'Lithuania', yt: 'CvG3sdGdGUA' },
  { name: 'F.Y.R. Macedonia', yt: 'hJ8vStigz7k' }];

module.exports.getFiltered = function () {
  const filteredCountries = [];
  for (const country of countries) {
    if (typeof (country.yt) === 'object') {
      for (ytMovie of country.yt)
        filteredCountries.push(ytMovie);
    } else if (typeof (country.yt) === 'string')
      filteredCountries.push(country.yt)
  }
  return filteredCountries;
}

module.exports.getCountryNameByVideoId = function (id) {
  for (const country of countries) {
    if (typeof (country.yt) === 'object') {
      for (ytMovie of country.yt) {
        if (ytMovie == id)
          return country.name;
      }
    } else if (typeof (country.yt) === 'string' && country.yt == id)
      return country.name;
  }
}