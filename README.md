# rsi-mongo-sanitize

Extends [mongo-sanitize](https://github.com/vkarpov15/mongo-sanitize) which sanitizes inputs against [query selector injection attacks](http://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html) to allow [RSI](https://www.w3.org/Submission/viwi-protocol/) query parameters

```
import { sanitize } from "rsi-mongo-sanitize";

// The sanitize function will strip out any keys that start with '$' in the input,
// except those which are special RSI query parameters
// so you can pass it to MongoDB without worrying about malicious users overwriting
// query selectors.

const clean = sanitize(req.params.username);

Users.findOne({ name: clean }, function(err, doc) {
  // ...
});
```

```
var sanitize = require('rsi-mongo-sanitize');

var clean = sanitize.sanitize(req.params.username);

Users.findOne({ name: clean }, function(err, doc) {
  // ...
});
```

If `sanitize()` is passed an object, it will mutate the original object.
