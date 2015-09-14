/**
 * HipChatController
 *
 * @description :: Server-side logic for managing HipChat integration.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  capabilities: function(req, res) {
    res.json(sails.config.hipchat.integration);
  }

};
