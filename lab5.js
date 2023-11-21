
const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  };
  
  const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true},
  ];
  

function Lab5(app){
    app.post("/a5/todos", (req, res) => {
        const newTodo = {
          ...req.body,
          id: new Date().getTime(),
        };
        todos.push(newTodo);
        res.json(newTodo);
    });


    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.due = req.body.due;
        todo.completed = req.body.completed;
        res.sendStatus(200);
      });
    
    
    
    app.get('/a5/todos/create', (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: 'New Todo',
            completed: false
        };
        todos.push(newTodo);
        res.json(todos);
    });


    
    // app.get("/a5/todos", (req, res) => {
    //     res.json(todos);
    //   });
    

    app.get('/a5/todos/:id', (req, res) => {
        const {id} = req.params;
        const todo = todos.find(todo => todo.id === parseInt(id));
        if(!todo){
            res.sendStatus(404).send('Todo not found');
            return;
        }
        res.json(todo);
    });
    

    app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
      });

    app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res.res
              .status(404)
              .json({ message:
                `Unable to delete Todo with ID ${id}` });
            return;
        }
      
        todos.splice(todos.indexOf(todo), 1);
        res.sendStatus(200);
    });


    // app.get('/a5/todos/:id/delete', (req, res) => {
    //     const {id} = req.params;
    //     const index = todos.findIndex((todo) => todo.id === parseInt(id));
    //     if(index === -1){
    //         res.sendStatus(404).send('Todo not found');
    //         return;
    //     }
    //     todos.splice(index, 1);
    //     res.json(todos);
    // });


    app.get('/a5/todos/completed', (req, res) => {
        const completedTodos = todos.filter(todo => todo.completed === true);
        res.json(completedTodos);
    });

    app.get('/a5/todos/:id/completed', (req, res) => {
        const {id} = req.params;
        const todo = todos.find(todo => todo.id === parseInt(id));
        if(!todo){
            res.sendStatus(404).send('Todo not found');
            return;
        }
        res.json(todo.completed);
    });

    app.get('/a5/todos/:id/completed/:newCompleted', (req, res) => {
        const {id, newCompleted} = req.params;
        const todo = todos.find(todo => todo.id === parseInt(id));
        if(!todo){
            res.sendStatus(404).send('Todo not found');
            return;
        }
        todo.completed = newCompleted;
        res.json(todo);
    });

    app.get('/a5/todos/:id/description', (req, res) => {
        const {id} = req.params;
        const todo = todos.find(todo => todo.id === parseInt(id));
        if(!todo){
            res.sendStatus(404).send('Todo not found');
            return;
        }
        res.json(todo.description);
    });

    app.get('/a5/todos/:id/description/:newDescription', (req, res) => {
        const {id, newDescription} = req.params;
        const todo = todos.find(todo => todo.id === parseInt(id));
        if(!todo){
            res.sendStatus(404).send('Todo not found');
            return;
        }
        todo.description = newDescription;
        res.json(todo);
    });
    

    app.get('/a5/todos', (req, res) => {
        const {completed} = req.query;
        if(completed === 'true'){
            const completedTodos = todos.filter(todo => todo.completed === true);
            res.json(completedTodos);
        }else if(completed === 'false'){
            const notCompletedTodos = todos.filter(todo => todo.completed === false);
            res.json(notCompletedTodos);
        }
        else{
            res.json(todos);
        }
        res.sendStatus(404);
    });


    app.get('/a5/assignment', (req, res) => {  
        res.json(assignment);
    });

    app.get('/a5/assignment/title', (req, res) => {
        res.json(assignment.title);
    });

    app.get('/a5/assignment/title/:newTitle', (req, res) => {
        const {newTitle} = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });

    app.get('/a5/assignment/score', (req, res) => {
        res.json(assignment.score);
    });

    app.get('/a5/assignment/score/:newScore', (req, res) => {
        const {newScore} = req.params;
        assignment.score = newScore;
        res.json(assignment);
    });

    app.get('/a5/assignment/completed', (req, res) => {
        res.json(assignment.completed);
    });

    app.get('/a5/assignment/completed/:newCompleted', (req, res) => {
        const {newCompleted} = req.params;
        assignment.completed = newCompleted;
        res.json(assignment);
    });




    const hello = (req, res) => {
        res.send('Welcome to Lab 5!');
    }
    app.get('/a5', hello);
    app.get('/a5/hello/:name', (req, res) => {
        const name = req.params.name;
        res.send(`Hello ${name}!`);
    });
    app.get('/a5/add/:a/:b', (req, res) => {
        const a = parseInt(req.params.a);
        const b = parseInt(req.params.b);
        
        res.send(`${a + b}`);
    });

    app.get('/a5/subtract/:a/:b', (req, res) => {
        const {a, b} = req.params;
        // const a = parseInt(req.params.a);
        // const b = parseInt(req.params.b);
        res.send(`${parseInt(a) - parseInt(b)}`);
    });

    app.get('/a5/calculator', (req, res) => {
        const {a, b, operation} = req.query;
        let result= 0;
        if(operation === 'add'){
            result = parseInt(a) + parseInt(b);
        } 
        else if(operation === 'subtract'){
            result = parseInt(a) - parseInt(b);
        } else {
            result = 'Invalid operation';
        }
        res.send(result.toString());
    });

    app.get("/a5/welcome", (req, res) => {
        res.send("Welcome to Assignment 5");
      });
    
}

export default Lab5;