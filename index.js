// const pgPromise = require('pg-promise')();
// const pgp = pgPromise();
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'node-todo-app-db'
});
// CREATE
function addRow(name, completed) {
    return db.one(`insert into todos (name,completed)
        values
        ($1, $2)
        returning id 
    `, [name, completed])
}

// addRow('walk the cat ', false)
//     .catch(err => {
//         console.log(err);
//     })
//     .then(result => {
//         console.log(result)
//     })




// Retrieve
// function getAll() {
//     return db.any('select * from todos')
// }
// getAll()
//     .then(results => {
//         console.log(results);
//         console.log('All the todos');
//     })


// example of grabbing one row
// function getByID(id) {
//     return db.one(`select * from todos where id = $1`,[id])
//         .catch(err => {
//             return {
//                 name: 'No Todo Found.'
//             };
//         })
// }

// getByID(3)
//     .then(results => {
//         console.log(results);
//     })

// getByID(20000)
//     .then(results => {
//         console.log(results);
//     })





// example of updating a row







// Delete

// function deleteByID(id) {
//     return db.any(`delete from todos where id = $1`,[id])
// }

// deleteByID(10)
//     .then(result =>{
//         console.log(result.rowCount);
//     })