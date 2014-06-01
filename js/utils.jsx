 /**
  * @jsx React.DOM
  */
var app = app || {};
app.properties = ['name', 'address', 'number', 'image'];

(function(){
  app.navigate = function (url) {
    return function () {
      page(url);
    }
  };

  app.BackboneMixin = {
    componentDidMount: function() {
      this._boundForceUpdate = this.forceUpdate.bind(this, null);
      this.getResource().on('all', this._boundForceUpdate, this);
    },

    componentWillUnmount: function() {
      this.getResource().off('all', this._boundForceUpdate);
    }
  };
})();