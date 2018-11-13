function header() {
    return `
        <header>
            <h1>Welcome!</h1>
        </header>
    `;
}

function footer() {
    return `
        <footer>
            <p>
            &copy; 2018 ILL WILL LLC
            </p>
        </footer>
    `;
}


function logOutButton() {  
    return `<div>
    <form action="/logout" method="POST">
    <input type="submit" value="logout">
    </form>
</div>`
}


function loginOrRegister() {
    return `
    <div>
    <a href="/login">Login</a>

    <a href="/register">Register</a>

    </div>`
}




module.exports = {
    header,
    footer,
    logOutButton,
    loginOrRegister
};