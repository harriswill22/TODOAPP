const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync('faceface', salt);
console.log(hash);
