"use strict";

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var MongoStore = require('connect-mongo')(session);
/*var path = require('path');
/*var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
*/
var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


// APIs


/*var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://bardwi:@Alicante123@cluster0-zbdsg.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("notebookshop").collection("notebooks");
  // perform actions on the collection object
  client.close();
});*/

mongoose.connect('mongodb://localhost:27017/notebookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# connection error: '));


app.use(session({
    secret: 'mySecretString',
    saveUninitialized:true,
    resave:false,
    //cookie:{maxAge: 1000 * 60 * 60 * 24 * 2},
    cookie: {secure: false},
    store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}))


// get session cart api
app.get('/cart', function(req, res) {
    if (typeof req.session.cart !== 'undefined') {
      res.json(req.session.cart);
    }
  })
  
// save session cart api
app.post('/cart', function(req, res){
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function(err){
        if(err){
            throw err;
        }
        res.json(req.session.cart);
    })
})






var Notebooks = require('./models/notebooks.js');


// POST method //

app.post('/notebooks', function(req, res){
    var notebook = req.body;

    Notebooks.create(notebook, function(err, notebooks){
        if(err){
            throw err;
        }
        res.json(notebooks);
    })
});

// GET method
app.get('/notebooks', function(req, res) {
    Notebooks.find(function(err, notebooks){
        if(err){
            throw err;
        }
        res.json(notebooks);
    })
});

//DELETE method

app.delete('/notebooks/:_id', function(req, res){
    var query = { _id: req.params._id };

    Notebooks.remove(query, function(err, notebooks){
        if(err){
            console.log('API DELETE BOOKS:', err);
        }
        res.json(notebooks);
    })
});

//UPDATE method

app.put('/notebooks/:_id', function(req,res){
    var notebook = req.body;
    var query = req.params._id;
    var update = {
        '$set' : {
            title: notebook.title,
            description: notebook.description,
            image: notebook.image,
            price: notebook.price
        }
    };

    // Return updated document
    var options = {new: true };
    Notebooks.findOneAndUpdate(query, update, options, function(err, notebooks){
        if(err){
            throw err;

        }
        res.json(notebooks);
    })
});

app.get('/images', function(req,res){
    const imgFolder = __dirname + '/public/images';

    const fs = require('fs');
    fs.readdir(imgFolder, function(err, files){
        if(err){
            return console.error(err);
        }

        const filesArr = [];
        var i=1;
        files.forEach(function(file){
            filesArr.push({name:file});
         i++
        });
        res.json(filesArr);
        
    })
})


//END APIs

/*
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

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

module.exports = app;*/
app.listen(3001, function(err){
    if(err){
        throw err;
    }
    console.log('API Server is listening on http://localhost:3001');
});