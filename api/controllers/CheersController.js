/**
 * CheersController
 *
 * @description :: Server-side logic for managing cheers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var HipChat = require('machinepack-hipchat');

module.exports = {

  send: function(req, res) {
    var userId = req.param('id');
    if (req.body) {
      var context = HipChat.commandContext(req.body);
      userId = context[1];
    }

    if (!userId) {
      return res.json({
        color: 'green',
        message: 'Cheers for everybody!',
        notify: false,
        message_format: 'text'
      });
    }

    Cheers.findOne({ user: userId }, function(err, user) {

      var sendResponse = function(err, cheeredUser) {
        if (Array.isArray(cheeredUser)) {
          cheeredUser = cheeredUser[0];
        }

        // Lookup the user @mention from their stored user ID.
        HipChat.viewUser({
          token: sails.config.hipchat.token,
          userId: cheeredUser.user,
        }).exec({
          success: function(result) {
            var message = '@' + result.mention_name + ' has received ' + cheeredUser.count + ' cheers!';
            return res.json({
              color: 'green',
              message: message,
              notify: false,
              message_format: 'text'
            });
          },
          error: function(err) {
            sails.log.error(err);
          }
        });
      };

      // If the user hasn't received a cheers yet, cheer them now!
      if (err || !user) {
        return Cheers.create({ user: userId }, sendResponse);
      }

      // Increment their cheer!
      Cheers.update(user.id, { count: user.count + 1 }, sendResponse);

    });
  }

};
