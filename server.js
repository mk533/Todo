var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var port = 8000 || process.env.PORT;
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


var db = mongoose.connect('mongodb://localhost/Todo');
/*var Schema = mongoose.Schema;

var Todoschema = new Schema({
    title: String,
    content: String
});
var bodyParser = require('body-parser');

var todos = mongoose.model('todos', Todoschema);
var first = new todos({
    title: "JS",
    content: "Should Complete Java Script by tomorrow"

});*/
var schema = new mongoose.Schema({
    text: String
});
var todos = mongoose.model('todos', schema);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());

/*
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we are connected mate!!");
});
*/




var appRouter = express.Router();
app.use('/api', appRouter);


appRouter.get('/1', function (req, res) {
    res.send("Hello MK!! This world 1");
});

appRouter.get('/todos', function (req, res) {
    todos.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            console.log(result);
            res.json(result);
        }
    });
});
appRouter.post('/todos', function (req, res) {
    todos.create({
        text: req.body.text
    }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            //console.log(req.body.Name + '   ' + req.body.Content)
            res.json({
                message: "created Succesfully"
            });
        }
    });
});
app.delete('/api/todos/:todo_id', function (req, res) {
    todos.remove({
        _id: req.params.todo_id
    }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            todos.find(function (err, results) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(results);
                }
            });
        }
    });

});
app.get('*', function (req, res) {
    res.send('public/index.html');
})


app.listen(port, function () {
    console.log("Server Running on port :" + port);
});