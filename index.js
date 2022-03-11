require('source-map-support/register');
const serverlessExpress = require('@vendia/serverless-express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const guestRoutes = require('./routes/guestRoutes');

const app = require('./app');

let serverlessExpressInstance;

function asyncTask() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('connected to database'), 1000);
  });
}

async function setup(event, context) {
  const asyncValue = await asyncTask();
  console.log(asyncValue);
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

function handler(event, context) {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  return setup(event, context);
}

exports.handler = handler;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/guests', guestRoutes);

app.use((err, req, res, next) => {
  console.error('ERROR', err.stack);
  res.status(500).send('ERROR', { error: err });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
