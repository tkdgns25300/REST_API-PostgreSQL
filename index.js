const express = require('express');
const res = require('express/lib/response');
const app = express();
const pool = require('./db');
const PORT = 3000;

app.use(express.json());


// get all todos
app.get("/todos", async (req, res) => {
    try {
        const todoList = await pool.query("SELECT * FROM todo");
        res.json(todoList.rows);
    } catch(err) {
        console.error(err.message);
    }
})

// get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1", 
            [todoId]
        );
        res.json(todo.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
})

// create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES $1 RETURNING * ", 
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const todoId = req.params.id;
        const { description } = req.body;
        const updatedTodo = await pool.query(
            "UPDATE todo SET description = $2 WHERE todo_id = $1 RETURNING * ",
            [todoId, description]
        );
        res.json(updatedTodo.rows[0]);
    } catch(err) {
        console.error(err.message);
    }
})

// delete a todo




app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})