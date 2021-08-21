'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


// Esoteric Resources
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');

const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');
const authRoutes = require('./routes/auth');


// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global middleware
app.use(logger);

// Routes
app.get('/',(req,res)=>{
  res.send('Every thing is working fine')
});

app.get('/status',(req,res)=>{
  res.send({
      domain:'https://bearer-authh.herokuapp.com/',
      status:'running',
      port:'3000',
  })
})

app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
app.use('/auth', authRoutes);


// Catchalls
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};