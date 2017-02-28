var bodyParser= require('body-parser');
var mongoose = require('mongoose');

//To remove mongoose deprecation warning
mongoose.Promise = global.Promise; // use native mongoose promises﻿


//Connect to database
mongoose.connect('mongodb://fredlazo:giants2010@ds163699.mlab.com:63699/todo1');

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);
/* Remove these in last video

var itemOne = Todo({item: 'Get busy!'}).save(function(err){
  if(err) throw err;
  console.log('Item saved');
});

var data = [{item: 'Kill Flanders'},{item: 'Eat donuts'},{item: 'Eat bacon'}];
*/
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo', function(req,res){
    //get data from mongodb and passs it to view
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req,res){
    // Get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    })
    //data.push(req.body);
  });

  app.delete('/todo/:item', function(req,res){
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
};
