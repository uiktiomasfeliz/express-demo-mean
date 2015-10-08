'use strict';

var users = require('../../app/controller/users.server.controller');

module.exports = function(app){
  app.route('/users')
  .post(users.create)
  .get(users.list);
};
