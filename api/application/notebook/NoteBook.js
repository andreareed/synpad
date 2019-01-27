const Knex = require('knex');
const uuid = require('uuid');
const connection = require('../../knexfile');
const { Model } = require('objection');
const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Notebook extends Model {
  static get tableName() {
    return 'notebooks';
  }

  static get notFoundMessage() {
    return 'Invalid notebook';
  }

  static get softDelete() {
    return true;
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../user/User'),
        join: {
          from: 'notebooks.user_id',
          to: 'users.id',
        },
      },
      notes: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../note/Note'),
        join: {
          from: 'notes.notebook_id',
          to: 'notebooks.id',
        },
      },
    };
  }

  $beforeInsert() {
    this.id = uuid.v4();
    this.created_at = new Date().toISOString();
  }
}

module.exports = Notebook;
