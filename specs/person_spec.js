describe("Person", function() {
  "use strict";

  var jampie = require("../src/jampie.js");
  var apiDoc = require("./api_doc.js");
  var server;

  jampie.setApiKey("myApiKey");

  beforeEach(() => server = sinon.fakeServer.create());
  afterEach(() => server.restore());

  describe("Overview", function() {
    var person, overview = apiDoc.person.overview;

    beforeEach(function() {
      server.respondWith(overview.response);
      person = jampie.getPerson("jamoftheday");
    });

    it("hits the correct url", function() {
      expect(server.requests[0].url).toEqual(overview.url);
    });

    it("gets the persons profile", function(done) {
      person.then(function(data) {
        var parsedData = JSON.parse(overview.response);
        expect(data.person).toEqual(parsedData.person);
        done();
      });
      server.respond();
    });
  });

  describe("Likes", function() {
    var person;
    var likes = apiDoc.person.likes;

    beforeEach(function(done) {
      var overview = apiDoc.person.overview;
      server.respondWith(overview.response);
      person = jampie.getPerson("jamoftheday").then(function(res) {
        person = res;
        done();
      });
      server.respond();
    });

    it("hits the correct url", function() {
      server.respondWith(likes.response);
      person.getLikes();
      expect(server.requests[1].url).toEqual(likes.url);
      server.respond();
    });

    it("gets his likes", function(done) {
      var firstJamsTitle = JSON.parse(likes.response).jams[0].title;
      server.respondWith(likes.response);
      person.getLikes()
        .then(function(data) {
          expect(data.jams[0].title).toEqual(firstJamsTitle);
          done();
        });
      server.respond();
    });
  });
});
