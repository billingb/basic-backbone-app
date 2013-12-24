define(["backbone"], function (Backbone) {
  var MainModel = Backbone.Model.extend({
    fetch: function () {
      this.set({title: "Hello World List", list: ["first", "second", "third"]});
    }
  });

  return MainModel;
});
