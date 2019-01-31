const Boom = require('boom');
const Notebook = require('./Notebook');
const Note = require('./Note');

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
    return Notebook.query().insertAndFetch({ user_id, ...payload });
  },

  async postNote(notebook_id) {
    return Note.query().insertAndFetch({ notebook_id });
  },

  async patchNote(id, payload) {
    if (!payload.title) {
      payload.title = 'Untitled';
    }
    return Note.query().patchAndFetchById(id, payload);
  },
};
