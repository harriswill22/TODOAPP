// DATABASE CONNECTION
const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Declare a class
class User {

    // what properties should a user start off with
    // 'constructor is a method 
    // that is automatically called when you creat a user
    constructor(id, name, username, pwhash) {
    //define properties that 
    // are also the names of the database columns 
    this.id = id;
    this.name = name;
    this.username = username;
    this.pwhash = pwhash;

    }
//     greet(otherUser) {
//     console.log(`Hello ${otherUser.name}, I am ${this.name} `);
//     }
// }







// =============================================
// CREATE
static addRow(name, username, password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return db.one(
        `insert into users (name, username, pwhash)
        values
        ($1, $2,$3)
        returning id 
    `, [name, username, hash])
    .then(data => {
        const u = new User(data.id, name, username);
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

static getByUsername(username) {
    return db.one(`
    select * from users 
    where username ilike 
    '%$1:raw%'
    `,[username]). then(result => {
        return new User(result.id,
            result.name,
            result.username,
            result.pwhash);
    })
}




getTodos() {
    return db.any (`
    select * from todos 
    where user_id = $1`,
    [this.id]);
}





passwordDoesMatch(thePassword) {
    const didMatch = bcrypt.compareSync(thePassword, this.pwhash);
    return didMatch;
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
