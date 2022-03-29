require('dotenv').config();
const express = require('express');
const ejs = require('ejs');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

const URI = 'mongodb://localhost:27017/coinDB';

const store = new MongoDBStore({
     uri: URI,
     collection: 'mySession'
});

app.use(session({
     secret: 'This is a crypto currency website',
     resave: false,
     saveUninitialized: false,
     store: store
}));

app.use(homeRoutes);
app.use(authRoutes);



mongoose.connect(URI)
.then(result => {
     app.listen(3000, console.log('Listening'));
})
.catch(err => {
     console.log(err);
})
