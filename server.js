var express = require('express');
var cors = require('cors');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var app = express();
app.use(cors());

app.options('*', cors()); // include before other routes


var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  appId: 'testid',
  masterKey: 'testid', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1338/parse' // Don't forget to change to https if needed
});

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1338/parse",
      "appId": "testid",
      "masterKey": "testid",
      "javascriptKey": "testid",
      "restKey": "testid",
      "appName": "dev-production"
    }
  ],
  "users": [
    {
      "user":"anime",
      "pass":"anime"
    },
    {
      "user":"anime2",
      "pass":"anime"
    }
  ]
});

//default test
app.get('/test', function(req, res){
  res.send('hello world');
});


// Serve static assets from the /public folder
app.use('/', express.static(__dirname + '/public'));

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

app.listen(1338, function() {
  console.log('parse-server-example running on port 1338.');
});


