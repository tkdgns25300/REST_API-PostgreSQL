const express = require('express');
const { Pool } = require('pg/lib');
const app = express();

const PORT = 3000;


// ROUTES //

// get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await Pool.query("SELECT * FROM todo");

        res.json(allTodos.rows);
    } catch(err) {
        console.error(err.message);
    }
})

// get a todo

app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Pool.query("SELECT * FROM todo WHERE todo_id - $1", [ id ]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// create a todo

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await Pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0])
    } catch(err) {
        console.error(err.message);
    }
})

// update a todo

// delete a todo








app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})