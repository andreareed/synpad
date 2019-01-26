const Joi = require('joi');

const controller = require('./notebook-controller');

module.exports = {
  name: 'Notebook Routes',
  register: async (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/notebooks',
        handler: controller.getNotebooksHandler,
        config: {
          auth: {
            strategies: ['jwt'],
          },
        },
      },
    ]);
  },
};
