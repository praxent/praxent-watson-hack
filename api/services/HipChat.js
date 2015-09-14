var HipChatter = require('hipchatter'),
    hc = new HipChatter(sails.config.hipchat.token);

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
 * @return {array} Room ID and user ID (if available).
 */
exports.commandContext = function(response) {
  if (!response.item) {
    sails.log.warn('Message send by HipChat not recognized.', response);
    return [];
  }

  if (response.item.message.mentions && response.item.message.mentions.length > 0) {
    // Only the user ID from the first @mention will be returned.
    return [response.item.room.id, response.item.message.mentions[0].id];
  }

  return [response.item.room.id];
};

/**
 * Return all messages from the room or user.
 *
 * @param {array} context A room ID and user ID (optional).
 * @param {function} cb A callback.
 */
exports.history = function(context, cb) {
  hc.history(context[0], function(err, history) {
    if (err) return cb(err);

    var messageHistory = history.items;

    // Limit the returned data to only messages from the requested user.
    if (context[1]) {
      messageHistory = _.filter(history.items, function(entry) {
        return entry.from.id === context[1];
      });
    }

    var messageHistory = _.pluck(messageHistory, 'message').join('\n');
    messageHistory = HipChat.filterHistory(messageHistory);

    cb(null, messageHistory);
  });
}

exports.filterHistory = function(history) {
  var filters = sails.config.hipchat.historyFilters;

  for (var i = 0; i < filters.length; i++) {
    history = history.replace(filters[i][0], filters[i][1]);
  }

  return history;
}
