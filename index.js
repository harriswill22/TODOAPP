require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('./models/db');
app.use(session({
    store: new pgSession({
        pgPromise: db
    }),
    secret: 'abc123bholeloytakumonaaaskddm',
    saveUninitialized: false
}));


app.use(express.static('public'));

// Configure body-parser to read data sent by HTML form tags
app.use(bodyParser.urlencoded({
    extended: false
}));

// Configure body-parser to read JSON bodies
app.use(bodyParser.json());

// const Todo = require('./models/Todo');
const User = require('./models/User');
// const bcrypt = require('bcrypt')
const page = require('./views/page');
const userList = require('./views/userList');
const todoList = require('./views/todoList');
const userForm = require('./views/userForm');
const registrationForm = require('./views/registrationForm');
const loginForm = require('./views/loginForm');

// Protect Route
function protectRoute(req, res, next) {
    let isLoggedIn = req.session.user ? true : false;
    if (isLoggedIn) {
        next();
    } else {
        res.redirect('/login')
    }
}


app.use((req, res, next) => {
    // let isLoggedIn = false;
    // if(req.session.user) {
    //     isLoggedIn = true
    // }
    let isLoggedIn = req.session.user ? true : false;
    console.log(`On ${req.path}Is  a user logged in? ${isLoggedIn}`);

    next();
});

app.get('/', (req, res) => {
    const thePage = page('hey there');
    res.send(thePage);
});

// ==============================================
// ALL USERS
// ==============================================


// Listen for a GET request
app.get('/users', (req, res) => {
    User.getAll()
        .then(allUsers => {
            // res.status(200).json(allUsers);
            // res.send(allUsers);
            const usersUL = userList(allUsers);
            const thePage = page(usersUL);
            console.log(thePage);
            res.send(thePage);

            // res.send(page(userList(allUsers)));
        });
});

// Listen for POST requests
// Create a new user
app.post('/users', (req, res) => {
    console.log(req);
    // console.log(req.body);
    // res.send('ok');
    const newUsername = req.body.name;
    console.log(newUsername);
    User.add(newUsername)
        .then(theUser => {
            res.send(theUser);
        })
});

// Updating an existing user
// Using POST because HTML Forms can only send GET or POST.
// HTML Form cannot send a PUT (or a DELETE).
// app.post('/users/:id(\\d+)', (req, res) => {
// app.post(/^\/users\/:id(\d+)/, (req, res) => {


// ========================================================
// Retrieve one user's info
app.post('/users/:id([0-9]+)/edit', (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    // Get the user by their id
    User.getById(id)
        .then(theUser => {
            // call that user's updateName method
            theUser.updateName(newName)
                .then(didUpdate => {
                    if (didUpdate) {
                        res.redirect(`/users`);
                    } else {
                        res.send('💩');
                    }
                });
        });
});

// ========================================================
// GET the form for editing one user's info
app.get('/users/:id([0-9]+)/edit', (req, res) => {
    // console.log(req.params.id);
    User.getById(req.params.id)
        .catch(err => {
            res.send({
                message: `no soup for you`
            });
        })
        .then(theUser => {
            res.send(page(userForm(theUser)));
        })
});

app.get('/users/:id([0-9]+)', (req, res) => {
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


// ========================================================
// Retrieve all todos for a user
app.get(`/users/:id(\\d+)/todos`, (req, res) => {
    User.getById(req.params.id)
        .then(theUser => {
            theUser.getTodos()
                .then(allTodos => {
                    const todosUL = todoList(allTodos);
                    const thePage = page(todosUL);
                    res.send(thePage);
                })
        })
});


app.get('/users/:id(\\d+)/rename/:newName', (req, res) => {
    User.getById(req.params.id)
        .then(user => {
            user.updateName(req.params.newName)
                .then(() => {
                    res.send('you just renamed them!');
                })
        })
});




// USER REGISTRATION 

app.get('/register', (req, res) => {
    // send them the sign-up form
    const theForm = registrationForm();
    const thePage = page(theForm);
    res.send(thePage);
    // res.send(page(registrationForm()));
});






app.post('/register', (req, res) => {
    // Process the sign-up form
    const newName = req.body.name;
    const newUsername = req.body.username;
    const newPassword = req.body.password;


    console.log(newName);
    console.log(newUsername);
    console.log(newPassword);

    User.addRow(newName, newUsername, newPassword)
        .catch(() => {
            res.redirect('/register');
        })
        .then(newUser => {
            req.session.user = newUser;
            res.redirect('/welcome');

        });



});

app.get('/dashboard', protectRoute, (req, res) => {
    const theUser = User.from(req.session.user);
    theUser.getTodos()
        .then(allTodos => {
            res.send(page(todoList(allTodos)));
        })

});


app.get('/welcome', protectRoute,
    (req, res) => {
        console.log(req.session.user);
        let visitorNAme = 'Person of the World'
        // Send them the welcome page 
        if (req.session.user) {
            visitorNAme = req.session.user.username;
        }
        res.send(page(`<h1>Hey there ${visitorNAme}</h1>`,
            req.session.user))
    });



// USER LOGIN

app.get('/login', (req, res) => {
    // Send them the login form
    const theLoginForm = loginForm();
    const thePage = page(theLoginForm);
    res.send(thePage)
})


app.post('/login', (req, res) => {
    // Process the login form
    // 1. Grab values from form
    const theUsername = req.body.username;
    const thePassword = req.body.password;


    // 2.Find a user whose name matches the 'Username'
    User.getByUsername(theUsername)
        .catch(err => {
            res.redirect('/login');
        })
        .then(theUser => {
            if (theUser.passwordDoesMatch(thePassword)) {
                req.session.user = theUser;
                res.redirect('/welcome');
            } else {
                res.redirect('/login');
            }
        })
    // 3.If i find a user, hen check to see if the password matches

});


app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});



app.listen(3000, () => {
    console.log('You express app is ready!');
});