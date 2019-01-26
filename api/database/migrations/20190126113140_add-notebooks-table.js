exports.up = async knex => {
  await knex.schema.createTable('notebooks', table => {
    table.uuid('id').primary();
    table.uuid('user_id').references('users.id');
    table.string('title').defaultsTo('Untitled');
    table.timestamp('created_at').notNullable();
    table.timestamp('deleted_at');
  });

  return knex.schema.createTable('notes', table => {
    table.uuid('id').primary();
    table
      .uuid('notebook_id')
      .references('notebooks.id')
      .onDelete('CASCADE');
    table.string('title').defaultsTo('Untitled');
    table.text('content');
    table.timestamp('created_at').notNullable();
    table.timestamp('deleted_at');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('notes');
  return knex.schema.dropTable('notebooks');
};
