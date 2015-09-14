
/**
 * Prepare the hook configuration from the Sails config object.
 *
 * @return {array} Array of Webhooks conforming to:
 *   https://www.hipchat.com/docs/apiv2/webhooks
 */
exports.parseHooks = function() {
  var hooks = sails.config.hipchat.hooks;
  var webhooks = [];

  for (var hook in hooks) {
    if (hooks[hook].url.indexOf('http') === -1) {
      hooks[hook].url = 'https://praxent-watson.herokuapp.com/' + hooks[hook].url;
    }
    hooks[hook].name = hook.charAt(0).toUpperCase() + hook.slice(1);
    webhooks.push(hooks[hook]);
  }

  return webhooks;
};

/**
 * Parse the message received by a HipChat /slash command for context details.
 *
 * @param {object} response The data posted by HipChat.
 * @return {array} Context ('user' or 'room') with the ID.
 */
exports.commandContext = function(response) {
  if (!response.item) {
    sails.log.warn('Message send by HipChat not recognized.', response);
    return [];
  }

  if (response.item.message.mentions && response.item.message.mentions.length > 0) {
    // Only the user ID from the first @mention will be returned.
    return ['user', response.item.message.mentions[0].id];
  }

  return ['room', response.item.room.id];
}
