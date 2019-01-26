const Boom = require('boom');
const service = require('./notebook-service');

module.exports = {
  async getNotebooksHandler(request) {
    return service.getNotebooks(request.auth.credentials.id);
  },

  async postNotebookHandler(request) {
    return service.postNotebook(request.auth.credentials.id, request.payload);
  },
};
