describe("Person", function() {
  "use strict";

  beforeEach(function() {
    var requests;

    this.xhr = sinon.useFakeXMLHttpRequest();
    requests = this.requests = [];

    this.xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    this.xhr.restore();
  });

  it("gets the persons profile from the api", function() {
    var spy = sinon.spy();
    var person = jamscript.getPerson("TeamJamPicks");

    person.then(spy);

    this.requests[0].respond(200, { "Content-Type": "application/json" }, { "person": { "name": "TeamJamPicks" } });
    expect(spy).to.be.calledWith({ "person": { "name": "TeamJamPicks" } });
  });
});
