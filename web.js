(function(){
  var express, fs, app, renderFile, port, slice$ = [].slice;
  import$(global, require('prelude-ls'));
  express = require('express');
  fs = require('fs');
  app = express.createServer(express.logger());
  console.log('/static', __dirname + '/public');
  app.use('/static', express['static'](__dirname + '/public'));
  app.use('/static', express['static'](__dirname + '/bower_components/'));
  renderFile = function(file){
    return function(it){
      return it.toString();
    }(fs.readFileSync(file));
  };
  app.get('/', function(req, res){
    return partialize$.apply(res, [res.send, [void 8], [0]])(
    renderFile("index.html"));
  });
  port = process.env.PORT || 8080;
  app.listen(port, function(){
    return "Listening on port " + port;
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function partialize$(f, args, where){
    var context = this;
    return function(){
      var params = slice$.call(arguments), i,
          len = params.length, wlen = where.length,
          ta = args ? args.concat() : [], tw = where ? where.concat() : [];
      for(i = 0; i < len; ++i) { ta[tw[0]] = params[i]; tw.shift(); }
      return len < wlen && len ?
        partialize$.apply(context, [f, ta, tw]) : f.apply(context, ta);
    };
  }
}).call(this);
