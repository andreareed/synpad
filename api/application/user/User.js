const Knex = require('knex');
const uuid = require('uuid');
const connection = require('../../knexfile');
const { Model } = require('objection');
const knexConnection = Knex(connection);

Model.knex(knexConnection);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get notFoundMessage() {
    return 'Invalid user';
  }

  static get relationMappings() {
    return {
      notebooks: {
        relation: Model.HasManyRelation,
        modelClass: require('../notebook/Notebook'),
        join: {
          from: 'notebooks.user_id',
          to: 'users.id',
        },
      },
    };
  }

  $beforeInsert() {
    this.id = uuid.v4();
    this.created_at = new Date().toISOString();
  }
}

module.exports = User;
