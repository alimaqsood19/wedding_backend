const { Model, knexSnakeCaseMappers } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'password',
    database: 'crowndb',
  },
  ...knexSnakeCaseMappers(),
});

// Give the knex instance to objection.
Model.knex(knex);

module.exports = Model;
