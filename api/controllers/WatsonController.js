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

      // @todo: Replace with call to Watson analyzing 'messageText'!
      var mood = '¯\\_(ツ)_/¯';

      res.json({
        color: 'green',
        message: mood,
        notify: false,
        message_format: 'text'
      });

    });
  }

};
