const { header, footer , logOutButton, loginOrRegister} = require('./helper')


function page(content, isLoggedIn=false) {
    
    
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css">
    <link rel="stylesheet" href="/stylesheets/index.css">
</head>
</head>
<body>
${header()}
${
    isLoggedIn ? logOutButton() : loginOrRegister()
}
${content}
${footer()}
</body>
</html>
    `;
}

module.exports = page;