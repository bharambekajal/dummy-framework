/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('admin', table => {
        table.increments('id').primary(); 
        table.string('username', 100).notNullable().unique(); 
        table.string('password', 255).notNullable(); 
        table.timestamp('createdat').defaultTo(knex.fn.now()); 
        table.timestamp('updatedat').defaultTo(knex.fn.now()); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('admin');
};
