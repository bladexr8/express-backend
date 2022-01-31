const express = require('express');
const readBody = require('../../lib/read-body');
const emails = require('../fixtures/emails');

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
    let body = await readBody(req);
    console.log('Received Body...');
    console.log(body.toString());

    // create email
    let newEmail = JSON.parse(body);
    emails.push(newEmail);

    // generate response
    res.status(201);
    res.send({
        "status": "OK",
        "message": "Email Received"
    });
}

let emailsRouter = express.Router();
emailsRouter.get('/', getEmailsRoute);
emailsRouter.get('/:id', getEmailRoute);
emailsRouter.post('/', createEmailRoute);

module.exports = emailsRouter;