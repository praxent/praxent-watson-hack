/**
 * WatsonController
 *
 * @description :: Server-side logic for Watson
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  mood: function(req, res) {

    if (!req.body) return res.forbidden();

    var context = HipChat.commandContext(req.body);

    HipChat.history(context, function(err, messageText) {

      sails.log.verbose('HipChat history received:', messageText);
      if (!messageText) {
        return res.json({
          color: 'gray',
          message: 'I simply cannot read minds.',
          notify: false,
          message_format: 'text'
        });
      }

      ReplyBuilder.buildReply(messageText, function(response) {
      	sails.log.info(response);
      	res.json(response);
      });

    });

  }

};
