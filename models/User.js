// DATABASE CONNECTION
const db = require('./db');

// Declare a class
class User {

    // what properties should a user start off with
    // 'constructor is a method 
    // that is automatically called when you creat a user
    constructor(id, name) {
    //define properties that 
    // are also the names of the database columns 
    this.id = id;
    this.name = name;
    }
//     greet(otherUser) {
//     console.log(`Hello ${otherUser.name}, I am ${this.name} `);
//     }
// }







// =============================================
// CREATE
static addRow(name) {
    return db.one(
        `insert into users (name)
        values
        ($1)
        returning id 
    `, [name])
    .then(data => {
        const u = new User(data.id, name );
        return u;
    });
}
// =============================================
// RETRIEVE
static getAll() {
    return db.any('select * from users')
    .then(userArray => {
const instanceArray = userArray.map(userObj => {
    const u = new User(userObj.id, userObj.name);
    return u;

});
    return instanceArray;
    })
}

static getById(id) {
    return db.one(`select * from users 
    where id = $1`, [id])
    .then(result => {
        const u = new User(result.id, result.name);
        return u;
    })
}

static searchByName(name) {
    return db.any(`
    select * from users where ilike '%1:raw%
    `, [name])
}


getTodos() {
    return db.any (`
    select * from todos 
    where user_id = $1`,
    [this.id]);
}


// =============================================
// UPDATE
updateName(name){
    return db.result(`update users
                    set name=$2
                    where id=$1`, [this.id, name]);
}


// =============================================
// DELETE
static deleteById(id) { 
    return db.result(`
    delete from users
    where id = $1`, 
    [id]);
}
delete() {
    return db.result(`
    delete from users
    where id = $1`, 
    [this.id]);
}

}
module.exports = User;
    // addRow,
    // deleteById,
    // getAll,
    // getByID,
    // updateName,
    // User
