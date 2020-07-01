// Plugins
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var stylus = require('stylus')
var expressJWT = require('express-jwt')
import Authorization from './routes/classes/instance/authorization'
// var bodyParser = require('body-parser');

// Classes
const authorization = new Authorization()
// Routes
var indexRouter = require('./routes/index')
var loginRouter = require('./routes/login')
var formRouter = require('./routes/form')
var usersRouter = require('./routes/users')
var fileRouter = require('./routes/file')

var app = express()

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(stylus.middleware(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))
// router middleware
app.use(
  expressJWT({
    secret: authorization.getKey(),
    resultProperty: 'locals.user'
  }).unless({
    path: ['/login', '/users/signup']
  }),
  function(req, res, next) {
    // const { locals } = res
    // const { user } = locals
    // const { _doc } = user
    next()
  }
)

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/form', formRouter)
app.use('/users', usersRouter)
app.use('/file', fileRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
