module.exports = {
  buildReply: function(text, callback) {
    ToneAnalyzer.analyzeTone(text, function(err, tone) {
    	if (err) {
    		sails.log.info("watson error: ", err);
    	} else {
    		// Expected response is an object with three categories and one string value attributed to each:
    		// tone.emotion = {'cheerful', 'negative', 'angry'}
    		// tone.writing = {'analytical', 'confident', 'tentative'}
    		// tone.social = {'open', 'agreeable', 'conscientious'}
    		sails.log.info("watson: ", tone);
    		var message,
    				color;

    		var emotion = tone.emotion;

    		var results = {
          cheerful: { color: 'green', message: '(awesome)' },
          negative: { color: 'black', message: '(wat)' },
    		  angry: { color: 'black', message: '(tableflip)' },
          default: { color: 'grey', message: '¯\\_(ツ)_/¯' }
    		};

        var reply = results[emotion] || results['default'];

	      callback({
	        color: reply.color,
	        message: reply.message,
	        notify: false,
	        message_format: 'text'
	      });

    	}
    });

  }
};
