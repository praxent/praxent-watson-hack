/**
 * HipChatController
 *
 * @description :: Server-side logic for managing HipChat integration.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  capabilities: function(req, res) {
    var integration = sails.config.hipchat.integration;

    // Parse the webhook definition and append to the global config. This will
    // be cached after the first request, but makes for a cleaner config file.
    if (!integration.capabilities.webook) {
      integration.capabilities.webhook = HipChat.parseHooks();
    }

    res.json(integration);
  }

};
