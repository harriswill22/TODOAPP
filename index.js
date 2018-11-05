// const pgPromise = require('pg-promise')();
// const pgp = pgPromise();
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'node-todo-app-db'
});



// example of grabbing all the rows
// db.any('select * from todos')
//     .then(results => {
//         console.log(results);
//     })

// example of grabbing one row
db.one('select * from todos where id = 10;')
.catch(err => {
    return{
        name: 'No Todo Found.'
    };
})

.then(results => {
    console.log(results);
})




// example of adding a row





// example of updating a row







// example of deleting a row



