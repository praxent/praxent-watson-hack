var SMILEY = ":-)";
var watson = require('watson-developer-cloud');
var authUrl = "https://gateway.watsonplatform.net/tone-analyzer-experimental/api";
var authorization = watson.authorization(sails.config.watson);

function authCallback(err, token) {
  console.log("err: " + err);
  console.log("token: " + token);
}

module.exports = {
  analyzeTone: function(text) {
    authorization.getToken({url:authUrl}, authCallback);
    return SMILEY;
  }
};