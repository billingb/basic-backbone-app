define(["underscore", "backbone", "views/MainView", "models/MainModel", "chai", "sinon", "sinonChai", "chaiJquery"],
  function (_, Backbone, MainView, MainModel, chai, sinon, sinonChai, chaiJquery) {

  describe("MainView", function () {
    var mainView, mainModel;

    before(function () {
      chai.should();
      chai.use(sinonChai);
      chai.use(chaiJquery);

      mainModel = new MainModel({
        title: "test title",
        list: ["one", "two", "three", "four"]
      });

      mainView = new MainView({model: mainModel});
    });

    describe("Initial render", function () {

      before(function () {
        mainView.render();
      });

      it("Should render the title", function () {
        mainView.$el.find("header").should.have.text("test title");
      });

      it("Should render the list", function () {
        var listItems = mainView.$el.find("#list > li");
        listItems.length.should.eql(mainModel.get("list").length);
        $(listItems[0]).should.have.text(mainModel.get("list")[0]);
        $(listItems[2]).should.have.text(mainModel.get("list")[2]);
      });

    });
  });
});
