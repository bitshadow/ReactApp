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

      // default or users route
      page('/', function (ctx) {
        console.log('main page called', app.users);
        self.setState({
          component: <UsersComponent collection={app.users} />
        });
      });

      // add route
      page('/add', function(ctx) {
        self.setState({
          component: <NewUserComponent collection={app.users} />
        });
      });

      // edit user with model id
      page('/users/:id', function (ctx) {
        var model = app.users.get(ctx.params.id);
        if (!model) {
          app.navigate('blahblah');
        }
        self.setState({
          component: <EditUserComponent params={ctx.params} model={model} />
        });
      });

      page('*', function (ctx) {
        console.log('* page called', app.users);
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
