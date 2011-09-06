(function() {
  var Coml, Stream, error, mkfunc, tags;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  tags = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'keygen', 'kbd', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp'];
  Stream = (function() {
    function Stream() {
      this.stream = "";
    }
    Stream.prototype.append = function(data) {
      return this.stream += data;
    };
    Stream.prototype.get = function() {
      return this.stream;
    };
    Stream.prototype.reset = function() {
      return this.stream = "";
    };
    return Stream;
  })();
  Coml = (function() {
    function Coml(par) {
      var tag, _i, _len;
      this.out = new Stream();
      for (_i = 0, _len = tags.length; _i < _len; _i++) {
        tag = tags[_i];
        par[tag] = mkfunc(tag, this.out);
      }
      par.text = __bind(function(txt) {
        return this.out.append(txt);
      }, this);
    }
    Coml.prototype.parse = function(f) {
      var html;
      this.out.reset();
      f();
      html = this.out.get();
      this.out.reset();
      return html;
    };
    return Coml;
  })();
  exports.Coml = Coml;
  mkfunc = function(name, out) {
    return function() {
      var arg, args, attr, attrs, classname, i, id, key, lastarg, res, value, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      attrs = {};
      out.append("<" + name);
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
        for (attr in attrs) {
          value = attrs[attr];
          out.append(" " + attr + "='" + value + "'");
        }
      }
      out.append('>');
      lastarg = args[args.length - 1];
      if (typeof lastarg !== 'function') {
        error("Last argument of " + name + " must be a function");
        return;
      }
      res = lastarg();
      if (typeof res === 'string') {
        out.append(res);
      }
      out.append("</" + name + ">");
    };
  };
  error = function(msg) {
    return console.log("Error " + msg);
  };
}).call(this);
