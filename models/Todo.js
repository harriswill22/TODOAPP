const db = require('./db');
class Todo {

constructor(id, name, completed) {
this.id = id;
this.name = name;
this.completed = completed;
}

// CREATE
static addRow(name, completed) {
    return db.one(`insert into todos (name,completed)
        values
        ($1, $2)
        returning id 
    `, [name, completed])
    .then(data =>{
        const newTodo = new Todo(name, completed );
        return newTodo;
    });
}

// Retrieve 
static getAll() {
        return db.any(`
        select * from todos`
        ).then(todoArry =>{
            const instanceArray = todoArry.map(todoObj =>{
                const allTodos = new Todo(todoObj.name, todoObj.completed);
                return allTodos;
            });
            return instanceArray;
        })
    }
    

    static getByID(id) {
        return db.one(`select * from todos where id = $1`,[id])
        .then(result => {
            const todoID = new Todo(result.id, result.name);
            return todoID;
        })
        }
    

static getTodosForUser(name) {
    return db.any( `select * from todos where user_id = $1`,[name])
}


// UPDATE

assignToUser(userID) {
return db.result (`update todos
    set user_id = $1
    where id = $2`, [this.id,userID])  
}


updatedCompleted(didComplete){
    return db.result(`update todos
                        set completed=$2           
                        where id=$1`, [this.id, didComplete]);
}

markCompleted() {
    return this.updatedCompleted(true);
}

markPending() {
    return this.updatedCompleted(false);
}

updateName(name){
        return db.result(`update todos
                        set name=$2
                        where id=$1`, [this.id, name])
}

deleteByID() {
return db.result(`delete from todos where id = $1`,[this.id])
}

static deleteByID(id) {
    return db.result(`delete from todos where id = $1`,[id])
}

}
module.exports = Todo;
    // addRow,
    // deleteByID,
    // getAll,
    // getByID,
    // markCompleted,
    // markPending,
    // updateName,

