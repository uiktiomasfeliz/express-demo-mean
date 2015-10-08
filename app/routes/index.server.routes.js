'use strict';

module.exports = function(app){
  var index = require('../controller/index.server.controller');
  app.get('/', index.render);
}
