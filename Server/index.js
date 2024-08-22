const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/TODO-LIST-WEB-APP');

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    // Fetch the current state of the todo item
    TodoModel.findById(id)
        .then(todo => {
            // Toggle the 'done' state
            const newDoneState = ! todo.done;
            console.log(newDoneState);
            // Update the todo item with the new 'done' state
            TodoModel.findByIdAndUpdate(id, { done: newDoneState }, { new: true })
                .then(result => res.json(result))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})



app.listen(3001, () => {
    console.log("Server is Running");
});