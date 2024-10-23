/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('business_screen1_data', table => {
        table.increments('id').primary();
        table.string('field1', 255).notNullable();
        table.string('field2', 255).notNullable();
        table.bigInteger('number').notNullable().unique();
        table.string('email', 255).notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('business_screen1_data');
};
