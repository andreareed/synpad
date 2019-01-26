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
      {
        method: 'POST',
        path: '/notebooks',
        handler: controller.postNotebookHandler,
        config: {
          auth: {
            strategies: ['jwt'],
          },
          validate: {
            payload: {
              title: Joi.string().allow(''),
              description: Joi.string().allow(''),
            },
          },
        },
      },
    ]);
  },
};
