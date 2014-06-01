
var app = app || {};

(function() {
  'use strict';

  app.User = Backbone.Model.extend({
    defaults: {
      name: null,
      address: null,
      number: null,
      image: null
    }
  })
})();
