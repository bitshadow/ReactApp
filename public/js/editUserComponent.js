 /**
  * @jsx React.DOM
  */
var app = app || {};

(function() {

  app.EditUserComponent = React.createClass({displayName: "EditUserComponent",
    componentDidUpdate: function(prevProps) {
      app.properties.forEach(function(property) {
        if (this.state.editing[property]) {
          this.refs[property].getDOMNode().focus();
        }
      }, this);
    },

    getInitialState: function() {
      return { editing: { name: false } }
    },

    startEditing: function(e) {
      var state = this.state;
      var $el = $(e.currentTarget);

      state.editing[$el.attr('name')] = true;
      this.setState(state);
    },

    stopEditing: function(e) {
      var state = this.state;
      var $el = $(e.target);

      state.editing[$el.attr('name').split('-')[1]] = false;
      this.setState(state);
    },

    setProperty: function(e) {
      var $el = $(e.target);
      var property = $el.attr('name').split('-')[1];

      this.props.model.set(property, $el.val());
      this.props.model.save();
    },

    handleEditKeyPress: function(e) {
      if (13 == event.keyCode) {
        this.stopEditing(e);
      }
    },

    destroy: function(e) {
      this.props.model.destroy();
      app.navigate(app.BASE_ROUTE + '/')()
    },

    handleFileSelect: function(e) {
      var self = this;
      var files = e.target.files;

      for (var i = 0, f; f = files[i]; i++) {

        if (!f.type.match('image.*')) {
          continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            var data = e.target.result;
            self.props.model.set('image', data);
            self.props.model.save();
            self.setState(self.state);
          };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
      }
    },

    render: function() {
      var inputStyle = {};
      var viewStyle = {};

      app.properties.forEach(function(property) {
        inputStyle[property] = {};
        viewStyle[property] = {};
      });

      app.properties.forEach(function(property) {
        if (this.state.editing[property]) {
          viewStyle[property] = {
            display: 'none'
          }
        } else {
          inputStyle[property] = {
            display: 'none'
          }
        }
      }, this);

      return (
        React.createElement("div", {className: "edit-user", onChange: this.setProperty, onKeyPress: this.handleEditKeyPress, onBlur: this.stopEditing}, 
          React.createElement("h1", null, "Edit User"), 
          React.createElement("table", {className: "table"}, 
            React.createElement("tr", null, 
              React.createElement("td", null), 
              React.createElement("td", null, 
                React.createElement("img", {id: "image", className: "view thumb", name: "image", src: this.props.model.get('image')}), 
                React.createElement("input", {onChange: this.handleFileSelect, type: "file", name: "image"})
              )
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, " Name: "), 
              React.createElement("td", null, 
                React.createElement("div", {className: "view", name: "name", onDoubleClick: this.startEditing, style: viewStyle.name}, 
                  React.createElement("label", null, this.props.model.get('name'))
                ), 
                React.createElement("input", {ref: "name", className: "form-control", name: "edit-name", type: "text", style: inputStyle.name, defaultValue: this.props.model.get('name')})
              )
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, " Address: "), 
              React.createElement("td", null, 
                React.createElement("div", {className: "view", name: "address", onDoubleClick: this.startEditing, style: viewStyle.address}, 
                  React.createElement("label", null, this.props.model.get('address'))
                ), 
                React.createElement("input", {ref: "address", className: "form-control", name: "edit-address", type: "text", style: inputStyle.address, defaultValue: this.props.model.get('address')})
              )
            ), 
            React.createElement("tr", null, 
              React.createElement("td", null, " Phone: "), 
              React.createElement("td", null, 
                React.createElement("div", {className: "view", name: "number", onDoubleClick: this.startEditing, style: viewStyle.number}, 
                  React.createElement("label", null, this.props.model.get('number'))
                ), 
                React.createElement("input", {ref: "number", className: "form-control", name: "edit-number", type: "text", style: inputStyle.number, defaultValue: this.props.model.get('number')})
              )
            )
          ), 
          React.createElement("button", {type: "button", onClick: app.navigate(app.BASE_ROUTE + '/'), className: "btn btn-default pull-left"}, "Go Back"), 
          React.createElement("button", {type: "button", onClick: this.destroy, className: "btn btn-default pull-right"}, "Delete User")
        )
      )
    }
  });

})();
