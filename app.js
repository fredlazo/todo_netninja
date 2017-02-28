var express = require('express');
var app = express();
var todoController = require('./controllers/todoController.js');

app.set('view engine', 'ejs');

app.use(express.static('./assets'));

todoController(app);

app.listen(3000);
console.log('Listening on port 3000...');
