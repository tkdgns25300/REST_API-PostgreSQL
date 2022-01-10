const express = require('express');
const app = express();

const PORT = 3000;


// ROUTES //

// get all todos

// get a todo

// create a todo

app.post("/todos", async (req, res) => {
    try {
        console.log(req.body);
    } catch(err) {
        console.error(err.message);
    }
})

// update a todo

// delete a todo








app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})