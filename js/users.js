
var app = app || {};

(function() {
  'use strict';

  var Users = Backbone.Collection.extend({

    model: app.User,

    localStorage: new Backbone.LocalStorage('sprinklr-assignment'),

    comparator: function(user) {
      return user.get('name');
    }
  });

  app.users = new Users();
})();