
var express = require('express');
var path = require('path');
var logger = require('morgan');
var httpProxy = require('http-proxy');



var app = express();
app.use(logger('dev'));
app.use(express.json());

const apiProxy = httpProxy.createProxyServer({
    target:"http://localhost:3001"
});

app.use("/api", function(req,res){
    apiProxy.web(req, res);
});

/*
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());*/
app.use(express.static(path.join(__dirname, 'public')));

// APIs

/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notebookshop');

var Notebooks = require('./models/notebooks.js');*/


// POST method //
/*
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
        res.json(notebooks)
    })
});

//DELETE method

app.delete('/notebooks/:_id', function(req, res){
    var query = {_id: req.params._id};

    Notebooks.remove(query, function(err, notebooks){
        if(err){
            throw err;
        }
        res.json(notebooks);
    })
});

//UPDATE method

app.put('/notebooks/:id', function(req,res){
    var notebook = req.body;
    var query = {_id: req.params._id};
    var update = {
        '$set' : {
            title: notebook.title,
            description: notebook.description,
            image:notebook.image,
            price:notebook.price
        }
    };

    // Return updated document
    var options = {new: true};
    Notebooks.findOneAndUpdate(query, update, options, function(err, notebooks){
        if(err){
            throw err;

        }
        res.json(notebooks);
    })
})
*/

//END APIs


app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

module.exports = app;
