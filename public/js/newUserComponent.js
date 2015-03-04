/**
  * @jsx React.DOM
  */
var app = app || {};

(function() {

  app.NewUserComponent = React.createClass({displayName: "NewUserComponent",
    mixins: [app.BackboneMixin],

    componentWillMount: function() {
      this.imageData = null;
      this.props.collection.fetch();
    },

    setImageSrc: function(data) {
      this.imageData = data;
    },

    getResource: function() {
      return this.props.collection;
    },

    // Proper validations for needed here.
    createUser: function(event) {
      var user = {};
      app.properties.forEach(function(property) {
        if (property == 'image' &&  this.imageData) {
          user[property] = this.imageData;
        } else {
          var value = $('[name='+property+']').val();
          user[property] = value;
        }
      }, this);

      // Create model and add to collection.
      this.props.collection.create(user);
      // navigate back to users after creating user.
      app.navigate(app.BASE_ROUTE + '/')();
    },

    // HTML5 File Api for file upload.
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
            // Render thumbnail.
            var span = $('<span />');
            span.html(['<img class="thumb" src="',
                        e.target.result, '" title="',
                        escape(theFile.name), '"/>'].join(''));

            $('#image').html(span);
            // image data can be used with src attribute.
            self.imageData = e.target.result;
          };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
      }
    },

    render: function() {
      return (
        React.createElement("div", {className: "add-user"}, 
          React.createElement("h1", null, "Add User"), 
          React.createElement("form", {role: "form"}, 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("input", {placeholder: "name", className: "form-control", type: "text", name: "name"})
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("input", {placeholder: "address", className: "form-control", type: "text", name: "address"})
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("input", {placeholder: "number", className: "form-control", type: "text", name: "number"})
            ), 
            React.createElement("div", {id: "image"}), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("input", {placeholder: "image", onChange: this.handleFileSelect, className: "form-control", type: "file", name: "image"})
            ), 
            React.createElement("button", {type: "button", onClick: app.navigate(app.BASE_ROUTE + '/'), className: "btn btn-default pull-left"}, "Go Back"), 
            React.createElement("button", {type: "button", onClick: this.createUser, className: "btn btn-default pull-right"}, "Create User")
          )
        )
      );
    }
  });

})();