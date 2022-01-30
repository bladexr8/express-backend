
const express = require('express');

const users = require('./fixtures/users');
const emails = require('./fixtures/emails');

let app = express();

let getUsersRoute = (req, res) => {
    res.send(users);
}

let getEmailsRoute = (req, res) => {
    res.send(emails);
}

let router = express.Router();

router.get('/users', getUsersRoute);
router.get('/emails', getEmailsRoute);


app.use(router);
app.listen(3000);