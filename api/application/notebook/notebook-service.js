const Boom = require('boom');
const Notebook = require('./Notebook');

module.exports = {
  async getNotebooks(user_id) {
    return Notebook.query().where({ user_id });
  },

  async getNotebook(id) {
    return Notebook.query()
      .findById(id)
      .eager({ notes: true });
  },

  async postNotebook(user_id, payload) {
    return Notebook.query().insert({ user_id, ...payload });
  },
};
