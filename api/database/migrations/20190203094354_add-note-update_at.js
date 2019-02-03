exports.up = async knex => {
  return knex.schema.alterTable('notes', table => {
    table.timestamp('updated_at');
  });
};

exports.down = async knex => {
  await knex.schema.alterTable('notes', table => {
    table.dropColumn('updated_at');
  });
};
