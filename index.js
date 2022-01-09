const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json()) // => req.body


// ROUTES //

// get all todos

// get a todo

// create a todo

// update a todo

// delete a todo









app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})