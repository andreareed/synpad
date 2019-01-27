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
        method: 'GET',
        path: '/notebooks/{notebook}',
        handler: controller.getNotebookHandler,
        config: {
          auth: {
            strategies: ['jwt'],
            scope: ['notebook-{params.notebook}'],
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
