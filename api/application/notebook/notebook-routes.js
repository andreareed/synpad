const Joi = require('joi');
const {
  asyncValidation,
  objection: { rowExists, rowExistsWhere },
} = require('@synapsestudios/hapi-async-validation');

const Notebook = require('./Notebook');
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
      {
        method: 'POST',
        path: '/notebooks/{notebook}/note',
        handler: controller.postNoteHandler,
        config: {
          auth: {
            strategies: ['jwt'],
            scope: ['notebook-{params.notebook}'],
          },
          validate: {
            params: asyncValidation(
              {
                notebook: Joi.string()
                  .uuid()
                  .required(),
              },
              {
                notebook: rowExists(Notebook, 'id', Notebook.notFoundMessage, { convert: false }),
              }
            ),
          },
        },
      },
    ]);
  },
};
