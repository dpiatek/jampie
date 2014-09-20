module.exports = {
  apiKey: "myApiKey",
  person: {
    overview: {
      url: "http://api.thisismyjam.com/1/jamoftheday.json?key=myApiKey",
      response: JSON.stringify({ "person": { "name": "jamoftheday" } })
    },
    likes: {
      url: "http://api.thisismyjam.com/1/jamoftheday/likes.json?key=myApiKey",
      response: JSON.stringify({ "jams": [{ "title": "Snakehips" }]})
    },
    jams: {
      url: "http://api.thisismyjam.com/1/jamoftheday/jams.json?key=myApiKey",
      response: JSON.stringify({ "jams": [{ "artist": "Mapaga" }] })
    }
  }
};
