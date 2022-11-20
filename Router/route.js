const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/schema');

const Todo = new mongoose.model('Todo', todoSchema);

router.get('/', (req, res) => {
    Todo.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ message: "bad request", });
        } else {
            res.status(200).json(
                {
                    result: data,
                    message: "OK",
                });
        }
    }).limit(4);

});
router.get('/:id', (req, res) => {
    Todo.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "error occurd" });
        } else {
            res.status(200).json({ message: "OK", payload: data });
        }
    })

});
router.post('/', async (req, res) => {
    const todo = new Todo(req.body);
    await todo.save((err, data) => {
        if (err) {
            res.status(500).json({
                message: "error occurd server side",
            })
        } else {
            res.status(201).json({ message: "Todo created succesfully", payload: data })
        }
    })
});
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if (err) {
            res.status(500).json({ message: "data not created! error occurd " });
        } else {
            res.status(201).json({ message: "data created succesfully" });
        }
    })
});
router.put('/:id', (req, res) => {
    Todo.updateOne({ _id: req.params.id }, {
        $set: {
            titile: req.body.title, description: req.body.description,
            status: req.body.status
        }
    }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "error updating" });
        } else {
            res.status(200).json({ message: "OK", payload: data });
        }
    })

});
router.delete('/:id', (req, res) => {
    Todo.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({ message: "error occurd deleting todo" });
        } else {
            res.status(200).json({ message: "todo deleted succesfully" });
        }

    })
});

module.exports = router;