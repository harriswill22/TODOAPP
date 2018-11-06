const db = require('./db');

// CREATE
function addRow(name, completed) {
    return db.one(`insert into todos (name,completed)
        values
        ($1, $2)
        returning id 
    `, [name, completed])
}

// Retrieve 
function getAll() {
        return db.any('select * from todos')
    }
    getAll()
        .then(results => {
            console.log(results);
        console.log('All the todos');
    })

    function getByID(id) {
        return db.one(`select * from todos where id = $1`,[id])
        .catch(err => {
        return {
        name: 'No Todo Found.'
        };
        })
    }

function getTodosForUser(id) {
    return db.any( `select * from todos where user_id = $1`,[id]);
}




// UPDATE

function assignToUser(todoID, userID) {
    db.result (`update todos
    set user_id = $1
    where id = $2`, [todoID,userID]);
}




function updatedCompleted(id, didComplete) {
    return db.result(`update todos
                        set completed=true           
                        where id=$1`, [id, didComplete]);
}

function markCompleted(id) {
    return updatedCompleted(id,true);
}

function markPending(id) {
    //     // return updatedCompleted(id, false);
    return db.result(`update todos
                            set completed=true           
                            where id=$1`, [id, false]);
    }

function updateName(id, name) {
        return db.result(`update todos
                        set name=$2
                        where id=$1`, [id, name])
}

function deleteByID(id) {
return db.result(`delete from todos where id = $1`,[id])
}

module.exports = {
    addRow,
    deleteByID,
    getAll,
    getByID,
    markCompleted,
    markPending,
    updateName,
}
