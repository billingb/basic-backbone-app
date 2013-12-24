define(['jquery', 'views/MainView', 'models/mainModel', 'purl'], function ($, MainView, MainModel) {
  return {
    start: function () {
      var mainModel = new MainModel();
      mainModel.fetch();
      new MainView({model: mainModel, el: '#app'}).render();
    }
  };
});
