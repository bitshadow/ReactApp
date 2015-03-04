 /**
  * @jsx React.DOM
  */
var app = app || {};

(function() {
  var EditUserComponent = app.EditUserComponent;
  var UsersComponent = app.UsersComponent;
  var NewUserComponent = app.NewUserComponent;

  var PageNotFound = React.createClass({
    render: function() {
      return <div> not found </div>;
    }
  });

  /**
   * Application Router handles the page requests and navigates
   * to different urls. Pretty straight forward.
   */
  var Router = React.createClass({

    componentDidMount: function() {
      var self = this;

      console.log('location: ', window.location.pathname);
      // default or users route
      page('/ReactApp/', function (ctx) {
        console.log('inside reactapp');
        self.setState({
          component: <UsersComponent collection={app.users} />
        });
      });

      // add route
      page('/ReactApp/add', function(ctx) {
        self.setState({
          component: <NewUserComponent collection={app.users} />
        });
      });

      // edit user with model id
      page('/ReactApp/users/:id', function (ctx) {
        var model = app.users.get(ctx.params.id);
        if (!model) {
          app.navigate('blahblah');
        }
        self.setState({
          component: <EditUserComponent params={ctx.params} model={model} />
        });
      });

      page('*', function (ctx) {
        self.setState({ component: <PageNotFound /> });
      });

      page.start();
    },

    getInitialState: function() {
      return { component: <div /> };
    },

    render: function() {
      return this.state.component;
    }
  });

  React.renderComponent(<Router />, document.getElementById('content'));
})();
