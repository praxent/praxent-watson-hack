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

    		// var results = {
    		// 	cheerful: { color: 'green', message: 'saf' }
    		// };

    		// res.json(results[emotion]);

    		switch (emotion) {
    			case 'cheerful':
		        color = 'green';
		        message = '(awesome)';
    				break;
    			case 'negative':
		        color = 'black';
		        message = '(wat)';
    				break;
    			case 'angry':
		        color = 'red';
		        message = '(tableflip)';
    				break;
    			default:
    				color = 'grey',
    				message = '¯\\_(ツ)_/¯';
    		}

	      callback({
	        color: color,
	        message: message,
	        notify: false,
	        message_format: 'text'
	      });

    	}
    });

  }
};
