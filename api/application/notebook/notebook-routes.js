const Joi = require('joi');
const {
  asyncValidation,
  objection: { rowExists, rowExistsWhere },
} = require('@synapsestudios/hapi-async-validation');

const Notebook = require('./Notebook');
const Note = require('./Note');
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
              title: Joi.string()
                .max(65)
                .allow(''),
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
      {
        method: 'PATCH',
        path: '/notebooks/{notebook}/notes/{note}',
        handler: controller.patchNoteHandler,
        config: {
          auth: {
            strategies: ['jwt'],
            scope: ['notebook-{params.notebook}', 'note-{params.note}'],
          },
          validate: {
            params: asyncValidation(
              {
                notebook: Joi.string()
                  .uuid()
                  .required(),
                note: Joi.string()
                  .uuid()
                  .required(),
              },
              {
                notebook: rowExists(Notebook, 'id', Notebook.notFoundMessage, { convert: false }),
                note: rowExistsWhere(Note, 'id', 'notebook_id', 'values.notebook_id', Notebook.notFoundMessage, {
                  convert: false,
                }),
                payload: {
                  id: Joi.string()
                    .uuid()
                    .required(),
                  notebook_id: Joi.string()
                    .uuid()
                    .required(),
                  title: Joi.string().allow(''),
                  description: Joi.string().allow(''),
                },
              }
            ),
          },
        },
      },
      {
        method: 'DELETE',
        path: '/notebooks/{notebook}/notes/{note}',
        handler: controller.deleteNoteHandler,
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
                note: Joi.string()
                  .uuid()
                  .required(),
              },
              {
                notebook: rowExists(Notebook, 'id', Notebook.notFoundMessage, { convert: false }),
                note: rowExistsWhere(Note, 'id', 'notebook_id', 'values.notebook_id', Notebook.notFoundMessage, {
                  convert: false,
                }),
              }
            ),
          },
        },
      },
      {
        method: 'DELETE',
        path: '/notebooks/{notebook}',
        handler: controller.deleteNotebookHandler,
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
      {
        method: 'PATCH',
        path: '/notebooks/{notebook}',
        handler: controller.patchNotebookHandler,
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
                payload: {
                  title: Joi.string()
                    .max(65)
                    .allow(''),
                },
              }
            ),
          },
        },
      },
    ]);
  },
};
