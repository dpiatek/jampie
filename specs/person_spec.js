describe("Person", function() {
  "use strict";

  const personOverviewUrl = "http://api.thisismyjam.com/1/jamoftheday?key=myApiKey";
  const response = JSON.stringify({ "person": { "name": "jamoftheday" } });

  var jampie = require("../src/jampie.js");
  jampie.setApiKey("myApiKey");

  beforeEach(() => this.server = sinon.fakeServer.create());
  afterEach(() => this.server.restore());

  it("hits the correct url", function() {
    this.server.respondWith(response);
    jampie.getPerson("jamoftheday");
    expect(this.server.requests[0].url).toEqual(personOverviewUrl);
  });

  it("gets the persons profile from the api", function(done) {
    this.server.respondWith(response);
    jampie
      .getPerson("jamoftheday")
      .then(function(data) {
        expect(data).toEqual(JSON.parse(response));
        done();
      });
    this.server.respond();
  });
});
