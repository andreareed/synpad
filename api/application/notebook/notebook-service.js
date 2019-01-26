const Boom = require('boom');
const Notebook = require('./Notebook');

module.exports = {
  async getNotebooks(user_id) {
    return Notebook.query().where({ user_id });
  },
};
