/**
 * WatsonController
 *
 * @description :: Server-side logic for Watson
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  mood: function(req, res) {

    var context = HipChat.commandContext(req.body);
    sails.log.info(context);

    // @todo: Replace with call to Watson!
    var mood = '¯\\_(ツ)_/¯';

    res.json({
      color: 'green',
      message: mood,
      notify: false,
      message_format: 'text'
    });
  }

};
