const express = require('express');
const mongoose = require('mongoose');
const route = require('./Router/route');
//initialize express app
const app = express();
app.use(express.json());

//connection database with mongoose
mongoose
    .connect('mongodb://localhost/todos', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connection succesfull'))
    .catch(err => console.log(err))

//application route
app.use('/todo', route);




//default error handeler
function errorHandeler(err, req, res, next) {
    if (err.headerSent) {
        return next(err);
    }
    res.status(500).send(err.message);
};

//server
app.listen(5000, () => {
    console.log('listening port 5000');
});