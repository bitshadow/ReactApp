 /**
  * @jsx React.DOM
  */
var app = app || {};

(function() {

  app.UsersComponent = React.createClass({displayName: "UsersComponent",
    mixins: [app.BackboneMixin],

    getInitialState: function() {
      return { editingUserModelId: null };
    },

    componentWillMount: function() {
      this.props.collection.fetch();
    },

    setEditingUserModelId: function(userModelId) {
      this.setState({ editingUserModelId: userModelId });
    },

    unsetEditingUserModelId: function(userModelId) {
      if (userModelId == this.state.editingUserModelId ) {
        this.setState({ editingUserModelId: null });
      }
    },

    getResource: function() {
      return this.props.collection;
    },

    render: function() {
      return (
        React.createElement("div", {className: "header"}, 
          React.createElement("div", {className: "button-add"}, 
            React.createElement("button", {className: "btn btn-default", onClick: app.navigate('/add')}, "Add New User")
          ), 
          React.createElement("div", {className: "cards"}, 
            this.props.collection.map(function(model) {
              return (
                React.createElement("div", {className: "card"}, 
                  React.createElement("a", {className: "pull-right", href: '/users/' + model.id}, "edit"), 
                  React.createElement("div", {className: "pull-left"}, 
                    React.createElement("img", {className: "profile-image", src: model.get('image')})
                  ), 
                  React.createElement("h3", null, model.get('name')), React.createElement("br", null), 
                  React.createElement("span", {className: "glyphicon glyphicon-map-marker"}, React.createElement("em", null, model.get('address'))), React.createElement("br", null), 
                  React.createElement("span", {className: "glyphicon glyphicon-phone"}, model.get('number'))
                )
              )
            }, this)
          )
        )
      );
    }
  });
})();