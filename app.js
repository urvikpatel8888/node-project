global.framework={};
// var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
// require('../core/migration');
require('./core/models');
// require('./core/connection');
// require('./core/services');
const useImport = require('./config/use');
// const checkJwt = require('./config/jwt');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
require('./api/routes.js')(app);
require('dotenv').config();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');



//multiple app.use
for(key in useImport){
  app.use(useImport[key]);
}

// for(let key in routes.public){
//   app[routes.public[key].method](routes.public[key].path, routes.public[key].action);
// }

/* validate apis from here */
// app.use(checkJwt);

// for(let key in routes.protected){
//   // console.log(`app[${routes.protected[key].method}](${routes.protected[key].path}, ${routes.protected[key].action})`)
//   app[routes.protected[key].method](routes.protected[key].path, routes.protected[key].action);
// }
// app.use('/', routes);
// app.use('/users', usersRouter);

app.listen(process.env.PORT, async () => {
  console.log('listening on port '+ process.env.PORT);
});
// });

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
