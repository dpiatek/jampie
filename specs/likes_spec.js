describe("Likes", function() {
  "use strict";

  var jampie = require("../src/jampie.js");
  var fixtureLikes = require("./fixture.js").person.likes;
  var server;
  var likes;

  jampie.setApiKey("myApiKey");

  beforeEach(() => server = sinon.fakeServer.create());
  afterEach(() => server.restore());

  it("hits the correct url", function(done) {
    server.respondWith(fixtureLikes.response);
    likes = jampie.getLikes("jamoftheday").then(function(res) {
      likes = res;
      done();
    });
    expect(server.requests[0].url).toEqual(fixtureLikes.url);
    server.respond();
  });

  it("gets his likes", function(done) {
    var firstJamsTitle = JSON.parse(fixtureLikes.response).jams[0].title;
    server.respondWith(fixtureLikes.response);
    likes = jampie.getLikes("jamoftheday").then(function(res) {
        expect(res.jams[0].title).toEqual(firstJamsTitle);
        done();
      });
    server.respond();
  });
});
