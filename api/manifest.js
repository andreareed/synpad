const Boom = require('boom');
const path = require('path');
const Inert = require('inert');
const Bootstrap = require('./bootstrap');
const JWTAuth = require('hapi-auth-jwt2');
const objection = require('objection');
const objectionSoftDelete = require('objection-softdelete');
const knex = require('./knex');

// Register Model knex instance
objection.Model.knex(knex);
objectionSoftDelete.register(objection, {
  deleteAttr: 'deleted_at',
});

// Route Plugins
const authRoutes = require('./application/auth/auth-routes');
const userRoutes = require('./application/user/user-routes');
const notebookRoutes = require('./application/notebook/notebook-routes');

module.exports = {
  server: {
    routes: {
      cors: {
        origin: ['*'],
      },
      validate: {
        options: { abortEarly: false },
        failAction: (request, h, error) => {
          if (!error.details) {
            if (error.isBoom) {
              return error;
            }

            return Boom.badImplementation(error);
          }
          error.output.payload.validationErrors = error.details.map(failure => ({
            message: failure.message,
            type: failure.type,
            key: failure.path,
          }));
          return error;
        },
      },
    },
    port: 8500,
  },
  register: {
    plugins: [JWTAuth, Inert, Bootstrap, authRoutes, userRoutes, notebookRoutes],
  },
};
