describe("Person", function() {
  "use strict";

  var jampie = require("../src/jampie.js");
  var fixture = require("./fixture.js");
  var server;

  jampie.setApiKey("myApiKey");

  beforeEach(() => server = sinon.fakeServer.create());
  afterEach(() => server.restore());

  describe("Overview", function() {
    var person, overview = fixture.person.overview;

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
    var likes = fixture.person.likes;

    beforeEach(function(done) {
      var overview = fixture.person.overview;
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

  describe("Jams", function() {
    var person;
    var jams = fixture.person.jams;

    beforeEach(function(done) {
      var overview = fixture.person.overview;
      server.respondWith(overview.response);
      person = jampie.getPerson("jamoftheday").then(function(res) {
        person = res;
        done();
      });
      server.respond();
    });

    it("hits the correct url", function() {
      server.respondWith(jams.response);
      person.getJams();
      expect(server.requests[1].url).toEqual(jams.url);
      server.respond();
    });

    it("gets his jams", function(done) {
      var firstJamsArtist = JSON.parse(jams.response).jams[0].artist;
      server.respondWith(jams.response);
      person.getJams()
        .then(function(data) {
          expect(data.jams[0].artist).toEqual(firstJamsArtist);
          done();
        });
      server.respond();
    });
  });

  describe("Following", function() {
    var person;
    var following = fixture.person.following;

    beforeEach(function(done) {
      var overview = fixture.person.overview;
      server.respondWith(overview.response);
      person = jampie.getPerson("jamoftheday").then(function(res) {
        person = res;
        done();
      });
      server.respond();
    });

    it("hits the correct url", function() {
      server.respondWith(following.response);
      person.getFollowing();
      expect(server.requests[1].url).toEqual(following.url);
      server.respond();
    });

    it("gets people he follows", function(done) {
      var firstFollowed = JSON.parse(following.response).people[0].fullname;
      server.respondWith(following.response);
      person.getFollowing()
        .then(function(data) {
          expect(data.people[0].fullname).toEqual(firstFollowed);
          done();
        });
      server.respond();
    });
  });

  describe("Followers", function() {
    var person;
    var followers = fixture.person.followers;

    beforeEach(function(done) {
      var overview = fixture.person.overview;
      server.respondWith(overview.response);
      person = jampie.getPerson("jamoftheday").then(function(res) {
        person = res;
        done();
      });
      server.respond();
    });

    it("hits the correct url", function() {
      server.respondWith(followers.response);
      person.getFollowers();
      expect(server.requests[1].url).toEqual(followers.url);
      server.respond();
    });

    it("gets his likes", function(done) {
      var firstFollower = JSON.parse(followers.response).people[0].fullname;
      server.respondWith(followers.response);
      person.getFollowers()
        .then(function(data) {
          expect(data.people[0].fullname).toEqual(firstFollower);
          done();
        });
      server.respond();
    });
  });
});
