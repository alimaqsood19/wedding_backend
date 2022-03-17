const { Model, knexSnakeCaseMappers } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
  },
  pool: { min: 1, max: 1 },
  ...knexSnakeCaseMappers(),
});

// Give the knex instance to objection.
Model.knex(knex);

module.exports = Model;
