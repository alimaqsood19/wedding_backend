require('source-map-support/register');
const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app');

let serverlessExpressInstance;

function asyncTask() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Connected to database'), 500);
  });
}

async function setup(event, context) {
  const asyncValue = await asyncTask();
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

function handler(event, context) {
  if (serverlessExpressInstance) {
    return serverlessExpressInstance(event, context);
  }
  return setup(event, context);
}

exports.handler = handler;
