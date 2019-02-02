const Joi = require('joi');
const {
  asyncValidation,
  objection: { rowExists },
} = require('@synapsestudios/hapi-async-validation');

const User = require('./User');
const controller = require('./user-controller');

module.exports = {
  name: 'User Routes',
  register: async (server, options) => {
    server.route([
      {
        method: 'POST',
        path: '/users',
        handler: controller.registerUserHandler,
        config: {
          validate: {
            payload: {
              first_name: Joi.string().required(),
              last_name: Joi.string().required(),
              email: Joi.string()
                .email()
                .required(),
              password: Joi.string()
                .min(6)
                .required(),
              confirmPassword: Joi.any()
                .valid(Joi.ref('password'))
                .required(),
            },
          },
        },
      },
      {
        method: 'PATCH',
        path: '/users/{user}',
        handler: controller.updateUserHandler,
        config: {
          validate: {
            params: asyncValidation(
              {
                user: Joi.string()
                  .uuid()
                  .required(),
              },
              {
                user: rowExists(User, 'id', User.notFoundMessage),
              }
            ),
            payload: {
              id: Joi.forbidden(),
              first_name: Joi.string().required(),
              last_name: Joi.string().required(),
              email: Joi.string()
                .email()
                .required(),
              password: Joi.string().allow(''),
              newPassword: Joi.string().allow(''),
              confirmPassword: Joi.any()
                .valid(Joi.ref('newPassword'))
                .allow(''),
            },
          },
        },
      },
    ]);
  },
};
