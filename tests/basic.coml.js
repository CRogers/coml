(function() {
  var Coml;
  Coml = require('../lib/coml').Coml;
  console.log(new Coml(root).parse(function() {
    return html(function() {
      head(function() {
        return title(function() {
          return 'This is the title';
        });
      });
      return body(function() {
        text('This will simply add some text');
        h1(function() {
          return 'All your favourite tags are included';
        });
        h2(function() {
          return 'The nesting is made using functions';
        });
        p(function() {
          return span('.smalltext#id', function() {
            return 'We can use HAML like syntax for class and ids';
          });
        });
        div('.class#id', {
          further: 'attributes',
          are: 'added',
          like: 'this'
        }, function() {
          return 'Just remember those commas';
        });
        return div('.class', {
          its: 'also worth noting',
          coffescript: 'lets you use this',
          syntax: 'for object and so attributes'
        }, function() {
          return 'And this text will be put inside the div';
        });
      });
    });
  }));
}).call(this);
