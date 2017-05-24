//=====================================================================
// Server.js entry point
//=====================================================================

require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const _ = require('lodash');
const Schema = require('mongoose').Schema;
const validator = require('validator');
const cors = require('cors')
const helmet = require('helmet');
const sanitize = require('sanitize-html');
const port = process.env.PORT || 8080;

//=====================================================================
// For Static file on heroku
//=====================================================================
process.env.PWD = process.cwd();

//=====================================================================
// Connecting to database
//=====================================================================

mongoose.connect(process.env.MONGODB_URI);

//=====================================================================
// Setting up middleware
//=====================================================================

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//=====================================================================
// Serving Static files and base html page
//=====================================================================

app.use(express.static('/build'))

app.get('/test', (req, res) => {
    res.sendFile('/build/index.html');
});

//=====================================================================
// Schema and validation for Player model
//=====================================================================

let PlayerSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength:[30, "Name can't be over 30 characters long"],
    required: true
  },
  wins: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

let Player = mongoose.model('Player', PlayerSchema);

//=====================================================================
// Routes for creating and editing players
//=====================================================================

app.get('/player', (req, res, next) => {
  Player.find().then((players) => {
    res.send(players);
  })
})

app.post('/player', (req, res, next) => {
  let name = sanitize(req.body.name);

  Player.create({ name }).then((player) => {
    res.send(player);
  })
  .catch((err) => {
    next(err);
  });
})

app.put('/player/:id', (req, res, next) => {
  let _id = req.params.id;
  let body = _.pick(req.body, ['wins']);

  Player.findOneAndUpdate({ _id }, { $inc: { wins: 1 } }, { new: true }).then((player) => {
    res.send(player);
  })
  .catch((err) => {
    next(err);
  });
})

app.all('/*', (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
})


//=====================================================================
// Error handlers
//=====================================================================

app.use(function(err, req, res, next) {
  if (err.status !== 404) {
    return next(err);
  }
  console.log(err.message);
  res.status(404).send(err.message || 'Endpoint does not exist');
});



app.use(function(err, req, res, next) {
  if (err.name == 'ValidationError') {
    err.status = 400;
  } else {
    err.status = err.status || 500;
  }
  console.log(err.message);
  res.status(err.status).send(err.message || 'Internal Server Error');
});

//=====================================================================
// Starting server
//=====================================================================

let server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(`Running on port ${port}`);
});

