module.exports = {
  buildReply: function(text, callback) {
    ToneAnalyzer.analyzeTone(text, function(err, tone) {
      if (err)
        return sails.log.error(err);

      // Expected response is an object with three categories and one string value attributed to each:
      // tone.emotion = {'cheerful', 'negative', 'angry'}
      // tone.writing = {'analytical', 'confident', 'tentative'}
      // tone.social = {'open', 'agreeable', 'conscientious'}
      sails.log.info('Watson returned tone data:', tone);

      var emotion = tone.emotion,
          writing = tone.writing;

      var replies = {
        cheerful: { color: 'green', message: '(awesome)' },
        negative: { color: 'yellow', message: '(wat)' },
        angry: { color: 'red', message: '(tableflip)' },
        default: { color: 'gray', message: '¯\\_(ツ)_/¯' }
      };

      var writing_emoticons = {
        analytical: '(indeed)',
        confident: '(winning)',
        tentative: '(disappear)'
      };

      var reply = replies[emotion] || replies['default'];
      reply.message += writing_emoticons[writing] || writing_emoticons['default'];

      callback({
        color: reply.color,
        message: reply.message,
        notify: false,
        message_format: 'text'
      });
    });

  }
};
