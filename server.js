// todo express app
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Todo = require('./model/todo');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

//connect to mongoose
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//get all todos using async routes
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get a single todo
app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(500).send(err);
  }
});

//post a new todo
app.post('/todos', async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.json(todo);
  } catch (err) {
    res.status(500).send(err);
  }
});

//update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.json(todo);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(500).send(err);
  }
});
