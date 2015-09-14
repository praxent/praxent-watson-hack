var watson = require('watson-developer-cloud');
var tone_analyzer = watson.tone_analyzer({
  username:sails.config.watson.username,
  password:sails.config.watson.password,
  version:'v1'
});

module.exports = {
  analyzeTone: function(text, callback) {
    tone_analyzer.tone({text:"test"}, callback);
  }
};