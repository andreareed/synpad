const Boom = require('boom');
const service = require('./notebook-service');

module.exports = {
  async getNotebooksHandler(request) {
    return service.getNotebooks(request.auth.credentials.id);
  },

  async getNotebookHandler(request) {
    return service.getNotebook(request.params.notebook);
  },

  async postNotebookHandler(request) {
    return service.postNotebook(request.auth.credentials.id, request.payload);
  },

  async postNoteHandler(request) {
    return service.postNote(request.params.notebook);
  },

  async patchNoteHandler(request) {
    return service.patchNote(request.params.note, request.payload);
  },
};
