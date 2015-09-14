module.exports.hipchat = {
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
          "send_notification"
        ]
      },
      webhook: [
        {
          "url": "https://praxent-watson.herokuapp.com/watson/mood",
          "event": "room_message",
          "pattern": "^/mood.*",
          "name": "Mood"
        },
      ]
    },
  }
}
