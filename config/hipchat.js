module.exports.hipchat = {

  token: process.env.HIPCHAT_TOKEN,

  integration: {
    name: "Praxent HipChat Bot",
    description: "HipChat bot for the Praxent team.",
    key: "com.praxent.bot",
    links: {
      homepage: "https://praxent-watson.herokuapp.com/",
      self: "https://praxent-watson.herokuapp.com/hipchat/capabilities"
    },
    capabilities: {
      hipchatApiConsumer: {
        fromName: "Watson",
        scopes: [
          "send_notification",
          "view_messages"
        ]
      }
    },
  },

  hooks: {
    mood: {
      url: 'watson/mood',
      event: 'room_message',
      pattern: '^/mood.*',
    }
  },

  historyFilters: [
    [/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/g, '']
  ]

};
