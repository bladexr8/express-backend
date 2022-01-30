const express = require('express');

const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

let app = express();

app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

app.listen(3000);