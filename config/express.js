'use strict';

var config = require('./config'),
    session = require('express-session'),
    express = require('express'),
    //path = require('path'),//not used
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport');

/* USE */
module.exports = function(){
  var app = express();
  if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
  } else if(process.env.NODE_ENV === 'production'){
    app.use(compress());
  }
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  /* EJS */
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  app.use(passport.initialize());
  app.use(passport.session());
  /* JADE
  app.set('views', path.join(__dirname, '.app/views'));
  app.set('view engine', 'jade');
  */
  /* ROUTES */
  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/users.server.routes.js')(app);

  /* STATICS */
  app.use(express.static('./public'));
  return app;
}
