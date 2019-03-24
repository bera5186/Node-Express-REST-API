import express from "express";
import db from "./db";

const app = express();

app.use(express.json()); // init body-parser middle ware
app.use(express.urlencoded({ 'extended' : false }));

// GET request for getting all todos
app.get('/api/todo', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    });
});

// POST request for adding todo
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


// GET request for single todo
app.get('/api/todo/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((todo) => {
      if (todo.id === id) {

        res.writeHead(200, {"Content-Type": "application/json"});
        return res.end(JSON.stringify({
            success: true,
            message: 'todo retrieved successfully',
            todo,
          }));
        
      } 
  });
   res.status(404);
   return res.end(JSON.stringify({
    success: false,
    message: 'todo cannot be retrieved successfully',
   }));
});

// DELETE request for deleting a todo
app.delete('/api/todo/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
  
    db.map((todo, index) => {
      if (todo.id === id) {
         db.splice(index, 1);
         res.status(200, {"Content-Type": "application/json"});
         return res.end(JSON.stringify({
            success: 'true',
            message: 'Todo deleted successfuly',
         }));
      }
    });
  
      res.status(404);
      return res.end(JSON.stringify({
        success: 'false',
        message: 'todo not found',
      }));
  
   
  });

  // UPDA



const PORT  = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

//https://medium.com/@purposenigeria/build-a-restful-api-with-node-js-and-express-js-d7e59c7a3dfb
//https://medium.com/@purposenigeria/build-a-restful-api-with-node-js-and-express-js-part-two-3d7a82b8e00