import express from "express";
import db from "./db";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ 'extended' : false }));

app.get('/api/todo', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    });
});

app.post('/api/todo', (req, res) => {

    if(!req.body.title || !req.body.description) {

        res.status(400).send({
            success: false,
            message: 'Title and description is required'
        });

    } 

    const newTodo = {
        id: db.length +1,
        title: req.body.title,
        description: req.body.description
    };

    db.push(newTodo);

    return res.status(201).send({
        success: true,
        message: 'New todo have been added to the database',
        db
    })

});



const PORT  = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});