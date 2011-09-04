(function() {
  var error, mkfunc, regex, root, rstr, tag, tags, tagsr, _i, _j, _len, _len2;
  var __slice = Array.prototype.slice;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  tags = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'keygen', 'kbd', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp'];
  tagsr = ['(text)'];
  for (_i = 0, _len = tags.length; _i < _len; _i++) {
    tag = tags[_i];
    tagsr.push('(' + tag + ')');
  }
  rstr = '(\\n(\\s|(return))+(' + (tagsr.join('|')) + '))\\(';
  regex = new RegExp(rstr, 'g');
  root.coml = function(f) {
    var end, fstr, output, start, _j, _ref;
    fstr = f.toString().replace(regex, '$1.call(this, ');
    _ref = fstr.split('\n'), start = _ref[0], fstr = 3 <= _ref.length ? __slice.call(_ref, 1, _j = _ref.length - 1) : (_j = 1, []), end = _ref[_j++];
    f = new Function('', fstr.join('\n'));
    output = {};
    output.out = '';
    f.call(output);
    return output.out;
  };
  mkfunc = function(name) {
    return function() {
      var arg, args, attr, attrs, classname, i, id, key, val, value, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      attrs = {};
      this.out += "<" + name;
      for (i = 0, _ref = args.length; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
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
            break;
          case 'function':
            if (i !== args.length - 1) {
              error('function should be last arg for tag');
              return;
            }
            for (attr in attrs) {
              val = attrs[attr];
              this.out += " " + attr + "='" + value + "'";
            }
            console.log(this);
            this.out += '>' + arg.call(this);
        }
      }
      return this.out += "</" + name + ">";
    };
  };
  for (_j = 0, _len2 = tags.length; _j < _len2; _j++) {
    tag = tags[_j];
    root[tag] = mkfunc(tag);
  }
  root.text = function(txt) {
    return this.out += txt;
  };
  error = function(msg) {
    return console.log("Error " + msg);
  };
}).call(this);
