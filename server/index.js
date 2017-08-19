const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const pusherConfig = require('./pusher.json');

const pusherClient = new Pusher(pusherConfig);

const app = express();
app.use(bodyParser.json());

app.put('/users/:name', function(req, res) {
    console.log('User joined: ' + req.params.name);
    pusherClient.trigger('chat_channel', 'join', {
        name: req.params.name
    });
    res.sendStatus(204);
});

app.delete('/users/:name', function(req, res) {
    console.log('User left: ' + req.params.name);
    pusherClient.trigger('chat_channel', 'part', {
        name: req.params.name
    });
    res.sendStatus(204);
});

app.post('/users/:name/messages', function(req, res) {
    console.log('User ' + req.params.name + ' sent message: ' + req.body.message);
    pusherClient.trigger('chat_channel', 'message', {
        name: req.params.name,
        message: req.body.message
    });
    res.sendStatus(204);
});

app.listen(4000, function() {
    console.log('App listening on port 4000');
});
