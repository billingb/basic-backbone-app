/* jshint -W098 */
var require = {
  baseUrl: "./js",

  paths: {
    underscore: "../lib/underscore/underscore",
    backbone: "../lib/backbone/backbone",
    jquery: "../lib/jquery/jquery",
    purl: "../lib/purl/purl",
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
    purl: {
      deps: ["jquery"]
    },
    backbone: {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
  }
};
