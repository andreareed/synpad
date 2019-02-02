const Boom = require('boom');
const User = require('./User');

module.exports = {
  async get(id, relationships = {}) {
    return User.query()
      .findById(id)
      .eager(relationships);
  },

  async findById(id) {
    return User.query()
      .findById(id)
      .applyFilter('publicUserProfile');
  },

  async findByEmail(email) {
    return User.query().findOne({ email: email.toLowerCase() });
  },

  async registerUser(data) {
    return User.query()
      .insertAndFetch(data)
      .catch(err => {
        if (err.constraint) {
          throw Boom.badData('Email already exists');
        } else {
          throw Boom.badImplementation('Opps! Something went wrong.');
        }
      });
  },

  async patchUser(user_id, data) {
    return User.query()
      .patchAndFetchById(user_id, data)
      .applyFilter('publicUserProfile');
  },
};
