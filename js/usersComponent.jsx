 /**
  * @jsx React.DOM
  */
var app = app || {};

(function() {

  app.UsersComponent = React.createClass({
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
        <div className='header'>
          <div className='button-add'>
            <button className='btn btn-default' onClick={app.navigate(app.BASE_ROUTE + '/add')}>Add New User</button>
          </div>
          <div className='cards'>
            {this.props.collection.map(function(model) {
              return (
                <div className='card'>
                  <a className='pull-right' href={app.BASE_ROUTE + '/users/' + model.id}>edit</a>
                  <div className='pull-left'>
                    <img className='profile-image' src={model.get('image')} />
                  </div>
                  <h3>{model.get('name')}</h3><br/>
                  <span className='glyphicon glyphicon-map-marker'><em>{model.get('address')}</em></span><br/>
                  <span className='glyphicon glyphicon-phone'>{model.get('number')}</span>
                </div>
              )
            }, this)}
          </div>
        </div>
      );
    }
  });
})();