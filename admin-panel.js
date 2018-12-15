var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
const layout = require('express-layout');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }))

// parse text/html
app.use(bodyParser.text({ type: 'text/html' }))

//set view engine
app.set('view engine', 'ejs')
app.set('view options', { layout: false })
app.set('views', path.join(__dirname, 'views'))

const middleware = [
  layout(),
  express.static(path.join(__dirname, 'src')),
  cookieParser(),
  session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }),
]
app.use(middleware)
app.use(flash())

app.use('/',routes);

app.use('*',function(req, res){
  res.send('Error 404: Not Found!');
});

//app.use(express.static(path.join(__dirname, 'src')));
  
app.listen(3000,function(){
  console.log('Server running at Port 3000');
});
