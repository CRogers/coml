var key, root, value, _ref;
root = typeof exports !== "undefined" && exports !== null ? exports : this;
_ref = require('../lib/coml');
for (key in _ref) {
  value = _ref[key];
  root[key] = value;
}
console.log(root);
console.log(coml);
coml(function() {
  return html(function() {
    head(function() {
      return title(function() {
        return 'Testestest';
      });
    });
    return body(function() {
      h1(function() {
        return 'This is a test';
      });
      h2(function() {
        return 'How in the hell are we going to solve this problem';
      });
      return div(function() {
        return 'Yes, now we can write html as valid coffeescript';
      });
    });
  });
});