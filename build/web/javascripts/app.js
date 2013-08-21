(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.define({"app": function(exports, require, module) {
  window.App = Ember.Application.create()
  App.deferReadiness()

  // Uncomment below line if using Ember Data
  // App.Store = DS.Store.extend(revision: 11)
}});

if(Ember.testing) {
  Ember.run(function() {
    window.require("app");
  });
}
else {
  window.require("app");
}

window.require.define({"controllers/leaf": function(exports, require, module) {
  App.LeafController = Ember.ObjectController.extend({
  	alert: function(){
  		alert("hello");
  	}
  })
}});

window.require("controllers/leaf");

window.require.define({"initialize": function(exports, require, module) {
  var initialize;

  initialize = function() {
    return App.advanceReadiness();
  };

  $(function() {
    return initialize();
  });
  
}});

window.require.define({"router": function(exports, require, module) {
  App.Router.map(function() {
  	this.route("index"),
  	this.route("leaf")
  });
}});

window.require("router");

window.require.define({"routes/index": function(exports, require, module) {
  App.IndexRoute = Ember.Route.extend({
  	redirect: function(){
  		this.transitionToRoute("leaf");
  	}
  })
}});

window.require("routes/index");

window.require.define({"routes/leaf": function(exports, require, module) {
  App.LeafRoute = Ember.Route.extend()
}});

window.require("routes/leaf");

window.require.define({"templates/application": function(exports, require, module) {
  Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
  helpers = helpers || Ember.Handlebars.helpers; data = data || {};
    var hashTypes, hashContexts, escapeExpression=this.escapeExpression;


    hashTypes = {};
    hashContexts = {};
    data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
    
  });module.exports = module.id;
}});

window.require("templates/application");

window.require.define({"templates/index": function(exports, require, module) {
  Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
  helpers = helpers || Ember.Handlebars.helpers; data = data || {};
    


    data.buffer.push("<h1>Cinder Brunch</h1>");
    
  });module.exports = module.id;
}});

window.require("templates/index");

window.require.define({"templates/leaf": function(exports, require, module) {
  Ember.TEMPLATES["leaf"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
  helpers = helpers || Ember.Handlebars.helpers; data = data || {};
    var buffer = '', hashContexts, hashTypes, escapeExpression=this.escapeExpression;


    data.buffer.push("<button ");
    hashContexts = {'on': depth0};
    hashTypes = {'on': "STRING"};
    data.buffer.push(escapeExpression(helpers.action.call(depth0, "alert", {hash:{
      'on': ("click")
    },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
    data.buffer.push(" >click</button>");
    return buffer;
    
  });
  module.exports = module.id;
}});

window.require("templates/leaf");

window.require.define({"view-helpers": function(exports, require, module) {
  
}});

window.require("view-helpers");

