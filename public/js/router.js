 /**
  * @jsx React.DOM
  */
var app = app || {};

(function() {
  var EditUserComponent = app.EditUserComponent;
  var UsersComponent = app.UsersComponent;
  var NewUserComponent = app.NewUserComponent;

  var PageNotFound = React.createClass({displayName: "PageNotFound",
    render: function() {
      return React.createElement("div", null, " not found ");
    }
  });

  /**
   * Application Router handles the page requests and navigates
   * to different urls. Pretty straight forward.
   */
  var Router = React.createClass({displayName: "Router",

    componentDidMount: function() {
      var self = this;

      // default or users route
      page('/', function (ctx) {
        self.setState({
          component: React.createElement(UsersComponent, {collection: app.users})
        });
      });

      // add route
      page('/add', function(ctx) {
        self.setState({
          component: React.createElement(NewUserComponent, {collection: app.users})
        });
      });

      // edit user with model id
      page('/users/:id', function (ctx) {
        var model = app.users.get(ctx.params.id);
        if (!model) {
          app.navigate('blahblah');
        }
        self.setState({
          component: React.createElement(EditUserComponent, {params: ctx.params, model: model})
        });
      });

      page('*', function (ctx) {
        self.setState({ component: React.createElement(PageNotFound, null) });
      });

      page.start();
    },

    getInitialState: function() {
      return { component: React.createElement("div", null) };
    },

    render: function() {
      return this.state.component;
    }
  });

  React.renderComponent(React.createElement(Router, null), document.getElementById('content'));
})();
