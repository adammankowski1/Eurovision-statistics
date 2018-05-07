# Eurovision-statistic

A Node.js app using [Express 4](http://expressjs.com/), [React](https://reactjs.org/), React-Router and Redux (soon).

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) (prefered version 8.11.1) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone git@github.com:adammankowski1/Eurovision-statistics.git # or clone your own fork
$ cd eurovision-statistics
$ yarn --ignore-engines install
$ yarn start:dev
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku (to be updated soon)

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
