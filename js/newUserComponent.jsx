/**
  * @jsx React.DOM
  */
var app = app || {};

(function() {

  app.NewUserComponent = React.createClass({
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
      app.navigate('/')();
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
        <div className='add-user'>
          <h1>Add User</h1>
          <form role='form'>
            <div className='form-group'>
              <input placeholder='name' className='form-control' type='text' name='name' />
            </div>
            <div className='form-group'>
              <input placeholder='address' className='form-control' type='text' name='address' />
            </div>
            <div className='form-group'>
              <input placeholder='number' className='form-control' type='text' name='number' />
            </div>
            <div id='image'></div>
            <div className='form-group'>
              <input placeholder='image' onChange={this.handleFileSelect} className='form-control' type='file' name='image' />
            </div>
            <button type='button' onClick={app.navigate('/')} className='btn btn-default pull-left'>Go Back</button>
            <button type='button' onClick={this.createUser} className='btn btn-default pull-right'>Create User</button>
          </form>
        </div>
      );
    }
  });

})();