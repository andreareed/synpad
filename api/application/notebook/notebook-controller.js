const Boom = require('boom');
const service = require('./notebook-service');

module.exports = {
  async getNotebooksHandler(request) {
    const { id } = request.auth.credentials;
    return service.getNotebooks(id);
  },
};
