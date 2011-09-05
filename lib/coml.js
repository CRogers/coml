(function() {
  var Coml, error, mkfunc, tags;
  var __slice = Array.prototype.slice;
  tags = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'keygen', 'kbd', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp'];
  Coml = (function() {
    function Coml(par) {
      var tag, _i, _len;
      this.out = {
        stream: []
      };
      for (_i = 0, _len = tags.length; _i < _len; _i++) {
        tag = tags[_i];
        par[tag] = mkfunc(tag, this.out);
      }
      par.text = function(txt) {
        return this.out.stream += txt;
      };
    }
    Coml.prototype.parse = function(f) {
      var html;
      this.out.stream = [];
      f();
      html = this.out.stream;
      this.out.stream = [];
      return html;
    };
    return Coml;
  })();
  exports.Coml = Coml;
  mkfunc = function(name, out) {
    return function() {
      var arg, args, attr, attrs, classname, i, id, key, lastarg, val, value, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      attrs = {};
      out.stream.push("<" + name);
      console.log(args);
      if (args.length > 1) {
        for (i = 0, _ref = args.length - 2; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
          arg = args[i];
          switch (typeof arg) {
            case 'string':
              classname = (/\.([\w-]+)/.exec(arg))[1];
              if (classname) {
                attrs["class"] = classname;
              }
              id = (/#([\w-]+)/.exec(arg))[1];
              if (id) {
                attrs.id = id;
              }
              break;
            case 'object':
              for (key in arg) {
                value = arg[key];
                attrs[key] = value;
              }
          }
        }
      }
      for (attr in attrs) {
        val = attrs[attr];
        out.stream.push(" " + attr + "='" + value + "'");
      }
      out.stream.push('>');
      console.log(out.stream.join(""));
      lastarg = args[args.length - 1];
      if (typeof lastarg === 'function') {
        return out.stream.push(lastarg() + ("</" + name + ">"));
      } else {
        return error("Last arg must be function");
      }
    };
  };
  error = function(msg) {
    return console.log("Error " + msg);
  };
}).call(this);
