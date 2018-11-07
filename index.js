require('dotenv').config();
const Todo = require('./models/Todo')
const User = require('./models/User')

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


// Todo.getByID(1)
// .then(todo =>{
//     todo.updateName('sell the car')
// .then(result =>{
//     console.log(result);
// })
// })


// Todo.getByID(1)
// .then(usertodo => {
//     usertodo.assignToUser(1)
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


// Todo.getByID(1)
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

