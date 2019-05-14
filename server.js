const express = require('express');
const app = express();
const port =  4000;
const server = app.listen(process.env.PORT || port, () => {
  console.log(`Intently listening on port: ${port}`);
});
const io = require('socket.io')(server);

const cors = require('cors');
const parser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const Perspective = require('perspective-api-client');
const perspective = new Perspective({apiKey: process.env.PERSPECTIVE_API_KEY});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.use(cors());
app.use(parser.urlencoded({
  extended: false
}));
app.use(parser.json());

let status = {
  buffer: '',
  score: 0,
  date: 'Waiting on date'
};

app.post('/message', (req,res,next) => {
  if(req.body.message !== '') {
    console.log(req.body);

    interpret(req.body.message).then(result => {
      let parsed = JSON.parse(result);
      let score = parsed.attributeScores.TOXICITY.summaryScore.value;
      status = {
        buffer: req.body.message,
        score: score,
        date: new Date()
      };

      io.emit('message', status);
      res.status(400).send(status);
    });
  }
});

// For some reason socket.io does not respond to ES6
io.on('connection', function(socket) {
  console.log('new user');
  socket.emit('message', status);
});

const interpret = async (buffer) => {
  try {
    const text = buffer;
    const result = await perspective.analyze(text);
    let parsed = JSON.stringify(result, null, 2);
    return parsed;
  } catch(e) {
    console.error(e);
  }
}
