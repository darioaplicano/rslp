var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usuario.routes');
var seguirRouter = require('./routes/sigue.routes');
var contentsRouter = require('./routes/contenido.routes');
var newCommentRouter = require('./routes/comentar.routes');
var seeReadRouter = require('./routes/verLeer.routes');
var sawReadRouter = require('./routes/vistoLeido.routes');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var uri = "mongodb+srv://admin:admin@rslp-p0upv.gcp.mongodb.net/rslp?retryWrites=true";

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuario', usersRouter);
app.use('/sigue', seguirRouter);
app.use('/contenido', contentsRouter);
app.use('/comentar',newCommentRouter);
app.use('/verLeer',seeReadRouter);
app.use('/vistoLeido',sawReadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Connecting to database
mongoose.connect(uri, { useNewUrlParser:true}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

module.exports = app;