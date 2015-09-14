var watson = require('watson-developer-cloud');
var tone_analyzer = watson.tone_analyzer({
  username:sails.config.watson.username,
  password:sails.config.watson.password,
  version:'v1'
});
var CUTOFF = 0.5;
var emotions = [
  "cheerful",
  "negative",
  "angry"
];

module.exports = {
  analyzeTone: function(text, callback) {
    tone_analyzer.tone({text:text}, function(error, result) {
      if(error) {
        callback(error);
      } else {
        callback(null, getToneFromJsonResult(result));
      }
    });
  }
};

var TONE_WEIGHTINGS = {
  cheerful      : 1.1,
  negative      : 0.9,
  angry         : 1.0,
  analytical    : 1.1,
  confident     : 1.0,
  tentative     : 0.9,
  open          : 0.9,
  agreeable     : 1.1,
  conscientious : 1.0
};

function getToneFromJsonResult(jsonResult) {
  var tone = {};

  var emotion = jsonResult["children"][0]["children"];
  var writing = jsonResult["children"][1]["children"];
  var social  = jsonResult["children"][2]["children"];

  tone.emotionValues = [
    { name: "cheerful", value : emotion[0].normalized_score * TONE_WEIGHTINGS.cheerful },
    { name: "negative", value : emotion[1].normalized_score * TONE_WEIGHTINGS.negative },
    { name: "angry", value : emotion[2].normalized_score * TONE_WEIGHTINGS.angry }
  ];

  tone.writingValues = [
    { name: "analytical", value : writing[0].normalized_score * TONE_WEIGHTINGS.analytical },
    { name: "confident", value : writing[1].normalized_score * TONE_WEIGHTINGS.confident },
    { name: "tentative", value : writing[2].normalized_score * TONE_WEIGHTINGS.tentative }
  ];

  tone.socialValues = [
    { name: "open", value : social[0].normalized_score * TONE_WEIGHTINGS.open },
    { name: "agreeable", value : social[1].normalized_score * TONE_WEIGHTINGS.agreeable },
    { name: "conscientious", value : social[2].normalized_score * TONE_WEIGHTINGS.conscientious }
  ];

  tone.emotionValues = _.sortBy(tone.emotionValues, function(element) {
    return -element.value;
  });
  tone.writingValues = _.sortBy(tone.writingValues, function(element) {
    return -element.value;
  });
  tone.socialValues = _.sortBy(tone.socialValues, function(element) {
    return -element.value;
  });

  tone.emotion = tone.emotionValues[0].value == 0 ? null : tone.emotionValues[0].name;
  tone.writing = tone.writingValues[0].value == 0 ? null : tone.writingValues[0].name;
  tone.social = tone.socialValues[0].value == 0 ? null : tone.socialValues[0].name;

  return tone;
}