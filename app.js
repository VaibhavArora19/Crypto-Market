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
app.use(bodyParser.json());
app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
     next();
})

const URI = process.env.MONGODB_URI;

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
