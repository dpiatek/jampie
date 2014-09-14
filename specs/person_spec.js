describe("Person", function() {
  "use strict";

  var jampie = require("../src/jampie.js");
  var apiDoc = require("./api_doc.js");
  var server;

  jampie.setApiKey("myApiKey");

  beforeEach(() => server = sinon.fakeServer.create());
  afterEach(() => server.restore());

  describe("Overview", function() {
    var person, api = apiDoc.person.overview;

    beforeEach(function() {
      server.respondWith(api.response);
      person = jampie.getPerson("jamoftheday");
    });

    it("hits the correct url", function() {
      expect(server.requests[0].url).toEqual(api.url);
    });

    it("gets the persons profile", function(done) {
      person.then(function(data) {
        expect(data).toEqual(JSON.parse(api.response));
        done();
      });
      server.respond();
    });
  });

  describe("Likes", function() {
    var api = apiDoc.person.likes;

    it("hits the correct url", function() {
      server.respondWith(api.response);
      jampie.getPerson("jamoftheday").getLikes();
      expect(server.requests[1].url).toEqual(api.url);
    });

    it("gets his likes", function(done) {
      server.respondWith(api.response);
      jampie
        .getPerson("jamoftheday")
        .getLikes()
        .then(function(data) {
          expect(data).toEqual(JSON.parse(api.response));
          done();
        });
      server.respond();
    });
  });
});
