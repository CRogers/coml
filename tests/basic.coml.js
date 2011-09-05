(function() {
  var Coml;
  Coml = require('../lib/coml').Coml;
  console.log(new Coml(root).parse(function() {
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
  }));
}).call(this);
