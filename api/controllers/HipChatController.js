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
      var hooks = sails.config.hipchat.hooks;
      integration.capabilities.webhook = [];

      for (var hook in hooks) {
        if (hooks[hook].url.indexOf('http') === -1) {
          hooks[hook].url = 'https://praxent-watson.herokuapp.com/' + hooks[hook].url;
        }
        hooks[hook].name = hook.charAt(0).toUpperCase() + hook.slice(1);
        integration.capabilities.webhook.push(hooks[hook]);
      }
    }

    res.json(integration);
  }

};
