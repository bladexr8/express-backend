const express = require('express');
const bodyParser = require('body-parser');
const generateId = require('../../lib/generate-id');
const requireAuth = require('../../lib/require-auth');
const path = require('path');
const multer = require('multer');
const emails = require('../fixtures/emails');

let upload = multer({ dest: path.join(__dirname, '../../uploads')});

let getEmailsRoute = (req, res) => {
    res.send(emails);
}

let getEmailRoute = (req, res) => {
    let email = emails.find(email => email.id === req.params.id);
    res.send(email);
}

let createEmailRoute = async (req, res) => {
    console.log('Creating email...');

    // req object is a stream we can listen to
    // for "data" and "end" events
    // call utility function to process stream
    // asynchronously
    console.log('Received Body...');
    console.log(req.body);

    // create email
    let attachments = (req.files || []).map(file => '/uploads/' + file.filename);
    let newEmail = {
        ...req.body, 
        id: generateId(),
        attachments
    }
    emails.push(newEmail);

    // generate response
    res.status(201);
    res.send({
        "status": "OK",
        "message": "Email Created",
        "notes": newEmail
    });
}

let updateEmailRoute = async (req, res) => {
    let email = emails.find(email => email.id === req.params.id);
    Object.assign(email, req.body);
    res.status(200);
    res.send({
        "status": "OK",
        "message": "Email Updated",
        "notes": email
    })
}

let deleteEmailRoute = (req, res) => {
    let index = emails.findIndex(email => email.id === req.params.id);
    emails.splice(index, 1);
    res.status(204);
    res.send({
        "status": "OK",
        "message": "Email Deleted",
    })
}

// re-use configured middlware
let jsonBodyParser = bodyParser.json({ limit: '100kb'});

let emailsRouter = express.Router();

// require all requests to the router be authenticated
emailsRouter.use(requireAuth);

emailsRouter.get('/', getEmailsRoute);
emailsRouter.get('/:id', getEmailRoute);
emailsRouter.post('/', jsonBodyParser, upload.array('attachments'), createEmailRoute);
emailsRouter.patch('/:id', jsonBodyParser, updateEmailRoute);
emailsRouter.delete('/:id', deleteEmailRoute);

module.exports = emailsRouter;