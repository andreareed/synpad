const Knex = require('knex');
const uuid = require('uuid');
const connection = require('../../knexfile');
const { Model } = require('objection');
const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Note extends Model {
  static get tableName() {
    return 'notes';
  }

  static get notFoundMessage() {
    return 'Invalid note';
  }

  static get softDelete() {
    return true;
  }

  static get relationMappings() {
    return {
      notebooks: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('../notebook/Notebook'),
        join: {
          from: 'notes.notebook_id',
          to: 'notebooks.id',
        },
      },
    };
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  $beforeInsert() {
    this.id = uuid.v4();
    this.created_at = new Date().toISOString();
  }
}

module.exports = Note;
