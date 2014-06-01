 /**
  * @jsx React.DOM
  */
var app = app || {};

(function() {

  app.EditUserComponent = React.createClass({
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
      app.navigate('/')()
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
        <div className='edit-user' onChange={this.setProperty} onKeyPress={this.handleEditKeyPress} onBlur={this.stopEditing}>
          <h1>Edit User</h1>
          <table className='table'>
            <tr>
              <td></td>
              <td>
                <img id='image' className='view thumb' name='image' src={this.props.model.get('image')}></img>
                <input onChange={this.handleFileSelect} type='file' name='image' />
              </td>
            </tr>
            <tr>
              <td> Name: </td>
              <td>
                <div className='view' name='name' onDoubleClick={this.startEditing} style={viewStyle.name}>
                  <label>{this.props.model.get('name')}</label>
                </div>
                <input ref='name' className='form-control' name='edit-name' type='text' style={inputStyle.name} defaultValue={this.props.model.get('name')} />
              </td>
            </tr>
            <tr>
              <td> Address: </td>
              <td>
                <div className='view' name='address' onDoubleClick={this.startEditing} style={viewStyle.address}>
                  <label>{this.props.model.get('address')}</label>
                </div>
                <input ref='address' className='form-control' name='edit-address' type='text' style={inputStyle.address} defaultValue={this.props.model.get('address')} />
              </td>
            </tr>
            <tr>
              <td> Phone: </td>
              <td>
                <div className='view' name='number' onDoubleClick={this.startEditing} style={viewStyle.number}>
                  <label>{this.props.model.get('number')}</label>
                </div>
                <input ref='number' className='form-control' name='edit-number' type='text' style={inputStyle.number} defaultValue={this.props.model.get('number')} />
              </td>
            </tr>
          </table>
          <button type='button' onClick={app.navigate('/')} className='btn btn-default pull-left'>Go Back</button>
          <button type='button' onClick={this.destroy} className='btn btn-default pull-right'>Delete User</button>
        </div>
      )
    }
  });

})();
