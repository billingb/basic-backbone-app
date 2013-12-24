define(["underscore", "backbone", "text!templates/main.html"],
  function (_, Backbone, mainTemplate) {

  var MainView = Backbone.View.extend({
    render: function () {
      var template = _.template(mainTemplate);

      this.$el.append(template({
        title: this.model.get("title")
      }));

      _.each(this.model.get("list"), function (itemText) {
        this.addListItem(itemText);
      }, this);
    },

    addListItem: function (text) {
      var listItemTemplate = _.template("<li><%= text %></li>");

      $(this.$el.find("#list")).append(listItemTemplate({text: text}));
    }
  });

  return MainView;
});
