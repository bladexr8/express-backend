const express = require('express');
const logger = require('../lib/logger');
const compress = require('compression');
const lastResortErrorHandler = require('../lib/last-resort-error-handler');

const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

let app = express();

// middleware
app.use(logger);
app.use(compress());
app.use(lastResortErrorHandler);

// routers
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

app.listen(3000);