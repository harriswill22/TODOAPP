require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({extended: false}));

// configure body-parser to read JSON bodies
app.use(bodyParser.json());


const Todo = require('./models/Todo');
const User = require('./models/User');

// Listen for a GET request
app.get('/users', (req, res) => {
    User.getAll()
        .then(allUsers => {
            // res.status(200).json(allUsers);
            res.send(allUsers);
        })
});


// Match the string "/users/" followed by one or more digits
// REGular EXpressions
// app.get('/users/:id([0-9]+)', (req, res) => {
app.get(`/users/:id(\\d+)`, (req, res) => {
    // console.log(req.params.id);
    User.getById(req.params.id)
        .catch(err => {
            res.send({
                message: `no soup for you`
            });
        })
        .then(theUser => {
            res.send(theUser);
        })
});


app.get('/users/register', (req, res) => {
    res.send('you are on the registration page. no really.');
});


// ========== TODOS

app.get('/todos', (req, res) => {
Todo.getAll()
    .then(allTodos =>{
        res.send(allTodos);
    })
});

app.get(`/todos/:id(\\d+)`, (req, res ) => {
    Todo.getByID(req.params.id)
    .catch(err => {
        res.send({
            message: `no todo big fella`
        });
    })
    .then(theTodo => {
        res.send(theTodo);
        })
});

app.get(`/todos/user/:id(\\d+)/pending`, (req, res) =>{
    User.getById(req.params.id)
    .then(usertodo => {
        usertodo.getTodos()
        .then(result => {
            res.send(result)
        })
    })
})

// POST ===============================================

app.post('/users', (req, res) => {
    // console.log(req.body);
    // res.send('ok')
    const newUsername = req.body.name;
    User.addRow(newUsername)
    .then(theUser =>{
        res.send(theUser);
    })
});


app.post('/users/:id(\\d+)', (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    User.getById(id)
        .then(theUser => {
            theUser.updateName(newName)
                .then(result => {
                    if (result.rowCount ===1 ){
                        res.send('yes')
                    }else {
                        res.send('oops')
                    }

                })
        })
});






app.listen(3000, () => {
    console.log('You express app is ready!');
})










// ========================================================

// CRUD

// ========================================================

// CREATE


// Todo.addRow('shower the dog ', false)
// .then(result => {
// console.log(result)
// })

// ========================================================
// RETRIEVE 
// Todo.getAll()
// .then(results => {
// console.log(results);
// console.log('All TODOS');
// })


// Todo.getByID(2)
//     .then(todoID => {
//         console.log(todoID)
//     });


// ========================================================
// UPDATE


// User.updateName(2, 'shelly')
// .then(updatedName => {
//     console.log(updatedName);
// })


// Todo.getByID(2)
// .then(todo =>{
//     todo.updateName('Talk on the phone')
// .then(result =>{
//     console.log(result);
// })
// })


// ASSIGN
// Todo.getByID(2)
// .then(usertodo => {
//     usertodo.assignToUser(3)
//     .then(result => {
//         console.log(result);
//         })
//     })

// Todo.getByID(1)
// .then(todo =>{
// todo.updatedCompleted(true)
// .then(result =>{
// console.log(result);
// })
// })


// Todo.getByID()
//     .then(todo =>{
//         todo.markPending()
//             .then(result => {
//                     console.log(result); 
//             })
//         })

// Todo.getByID(4)
//     .then(todo =>{
//         todo.markCompleted()
//             .then(result => {
//                     console.log(result); 
//             })
//         })

















// DELETE

// Todo.getByID(7)
// .then(todo =>{
//     todo.deleteByID(7)
//     .then(result =>{
//         console.log(result);
        
//     })
// })

// Todo.deleteByID(8)
// .then(result =>{
//     console.log(result.rowCount);
// })

