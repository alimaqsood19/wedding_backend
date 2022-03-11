const Model = require('../services/pg.services');

class Guest extends Model {
  static get tableName() {
    return 'guests';
  }
}

module.exports = Guest;
