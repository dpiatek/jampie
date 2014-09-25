# jampie

A javascript API wrapper for www.thisismyjam.com.

## Installation

Jampie was built with browserify which means it is wrapped in a CommonJS module:
```
var jampie = require('path/to/jampie.js');
```
However, there is a file in `/dist` called `jampie.global.js` which lets you use jampie as a global.

## Usage

All calls return promises:

```
var nickCave = jampie.getPerson("nickCave");

nickCave.then(function(result) {
  console.log(result);
});
```
## Methods

The only methods implemented at this time are the `GET` method for a person. `getPerson` returns a wrapped object for which you can `getLikes`, `getJams` and so on. You can also directly get these by calling `getJamsFor` and passing user name as the first param.

Here is a list of currently available methods:

- getPerson
  - getLikes
  - getJams
  - getFollowing
  - getFollowers
- getLikesFor
- getJamsFor
- getFollowingFor
- getFollowersFor

