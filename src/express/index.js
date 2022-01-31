const express = require('express');
const logger = require('../lib/logger');
const compress = require('compression');
const serveStatic = require('serve-static');
const path = require('path');
const lastResortErrorHandler = require('../lib/last-resort-error-handler');

const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');

let app = express();

// middleware
app.use(logger);
app.use(compress());
app.use(serveStatic(path.join(__dirname, '../public')));
app.use('/uploads', serveStatic(path.join(__dirname, '../uploads')));
app.use(lastResortErrorHandler);

// routers
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

app.listen(3000);