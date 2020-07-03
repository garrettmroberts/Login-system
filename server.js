const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const routes = require('./routes');
const passport = require('./scripts/passport');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/mysteryincorporated'), mongooseOptions);

app.use(session({ secret: 'apple butter', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const PORT = process.env.PORT || 3001;

module.exports = app.listen(PORT, () => console.log('App listening at http://localhost:' + PORT));