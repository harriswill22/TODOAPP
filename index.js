const Todo = require('./models/Todo')





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

Todo.getByID(3)
.then(results => {
console.log(results);
});

Todo.getByID(20000)
.then(results => {
console.log(results);
})





// example of updating a row
// function updatedCompleted(id, didComplete) {
//     return db.result(`update todos
//                         set completed=true           
//                         where id=$1`, [id, didComplete]);
// }


// function markCompleted(id) {
//     return updatedCompleted(id,true);
    
// }



// function markPending(id) {
// //     // return updatedCompleted(id, false);
// return db.result(`update todos
//                         set completed=true           
//                         where id=$1`, [id, false]);
// }

// markPending(1)
// .then(result => {
//     console.log(result); })
    




// function updateName(id, name) {
//     return db.result(`update todos
//                     set name=$2
//                     where id=$1`, [id, name])
// }
// updateName(2, 'buy car')
// .then(result =>{
//     console.log(result);
// })
// // Delete

// // function deleteByID(id) {
// // return db.result(`delete from todos where id = $1`,[id])
// // }

// // deleteByID()
// // .then(result =>{
// // console.log(result.rowCount);
// // })




