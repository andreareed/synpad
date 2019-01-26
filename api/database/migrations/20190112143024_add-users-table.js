exports.up = async knex => {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email').unique();
    table.string('password');
    table.timestamp('created_at').notNullable();
  });
};

exports.down = async knex => {
  return knex.schema.dropTable('users');
};
