const express     = require('express');
const app         = express();
const path        = require('path');
const mysql       = require('mysql');
const session     = require('express-session');
const MySQLStore  = require('express-mysql-session')(session);
const Router      = require('./Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());


// Database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwertyuiop',
  database: 'SonarDB'
});

db.connect(function(err){
  if(err){
    console.log('DB error');
    throw err;
    return false;
  }
});

const sessionStore = new MySQLStore({
  expiration: (1825 * 86400 * 1000),
  endConnectionOnClose: false
}, db);

app.use(session({
  key: '446r398r362732832884284382',
  secret: '43535634iuy3fvnf43',
  store: sessionStore,
  resave: false,
  saveUnintialized: false,
  cookie: {
    maxAge: (1825 * 86400 * 1000),
    httpOnly: false
  }
}));

new Router(app, db);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000)
