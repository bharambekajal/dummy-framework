/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users_draft', table => {
        table.increments('id').primary(); // Primary key
        table.integer('admin_id').unsigned().references('id').inTable('admins').onDelete('CASCADE'); // Foreign key
        table.string('name', 100);
        table.string('state', 100);
        table.string('email', 100);
        table.string('number', 15);
        table.boolean('is_draft').defaultTo(false);
        table.string('status', 20).defaultTo('pending'); // Default status 'pending'
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Auto timestamp
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users_draft');
};