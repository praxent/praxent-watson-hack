module.exports.hipchat = {

  botName: 'Watson',

  token: process.env.HIPCHAT_TOKEN,

  integration: {
    name: 'Praxent HipChat Bot',
    description: 'HipChat bot for the Praxent team.',
    key: 'com.praxent.bot',
    links: {
      homepage: 'https://praxent-watson.herokuapp.com/',
      self: 'https://praxent-watson.herokuapp.com/hipchat/capabilities'
    },
    vendor: {
      name: 'Praxent',
      url: 'http://praxent.com'
    },
    capabilities: {
      hipchatApiConsumer: {
        fromName: 'Watson',
        scopes: [
          'send_notification',
          'view_messages'
        ]
      }
    },
  },

  hooks: {
    mood: {
      url: 'watson/mood',
      event: 'room_message',
      pattern: '^/mood.*',
    },
    cheers: {
      url: 'cheers/send',
      event: 'room_message',
      pattern: '^/cheers.*',
    }
  },

  historyFilters: [
    [/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/g, ''], // Remove URLs
    [/\@\S+|\/\S+/g, ''], // Remove @mention and /command messages
  ]

};
