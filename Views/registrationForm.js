function registrationForm() {
    return `
    <form action="/register" method="POST">
        <label> 
            Your name:
        </label>
    <input type="text" name="name">
        <label> 
            username:
        </label>
    <input type="text" name="username">

        <label> 
            Password:
        </label>
    <input type="password" name="password">

    <br>
    <input type="submit" value="Register!">

</form>
    `;
}

module.exports = registrationForm;