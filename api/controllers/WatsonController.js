/**
 * WatsonController
 *
 * @description :: Server-side logic for Watson
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  mood: function(req, res) {

    if (!req.body) return res.forbidden();

    var context = HipChat.commandContext(req.body),
    		message,
    		color;

    HipChat.history(context, function(err, messageText) {

      sails.log.info(messageText);

      ToneAnalyzer.analyzeTone(messageText, function(err, tone) {
      	if (err) {
      		sails.log.info("watson error: ", err);
      	} else {
      		// Expected response is an object with three categories and one string value attributed to each:
      		// tone.emotion = {'cheerful', 'negative', 'angry'}
      		// tone.writing = {'analytical', 'confident', 'tentative'}
					// tone.social = {'open', 'agreeable', 'conscientious'}
      		sails.log.info("watson: ", tone);
      		var emotion = 'angry'; // tone.emotion

      		var results = {
      			cheerful: { color: 'green', message: 'saf' }
      		};

      		res.json(results[emotion]);

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
      			default: '';
      		}

		      res.json({
		        color: color,
		        message: message,
		        notify: false,
		        message_format: 'text'
		      });

      	}
      });

    });

  }

};