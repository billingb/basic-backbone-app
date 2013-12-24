/* jshint -W098 */
var require = {
  baseUrl: "../../../src/js",

  paths: {
    chai: "../lib/chai/chai",
    sinon: "../lib/sinonjs/sinon",
    sinonChai: "../lib/sinon-chai/lib/sinon-chai",
    chaiJquery: "../lib/chai-jquery/chai-jquery",
    underscore: "../lib/underscore/underscore",
    backbone: "../lib/backbone/backbone",
    jquery: "../lib/jquery/jquery",
    text: "../lib/text",
    templates: "../templates"
  },

  shim: {
    underscore: {
      exports: "_"
    },
    jquery: {
      exports: "$"
    },
    chaiJquery: {
      deps: ["jquery", "chai"]
    },
    backbone: {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    sinon: {
      exports: "sinon"
    },
    sinonChai: {
      deps: ["sinon", "chai"]
    }
  }
};
