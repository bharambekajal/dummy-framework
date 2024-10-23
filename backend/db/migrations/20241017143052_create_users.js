// migrations/20241017120000_business_screen1_data.js
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary(); 
        table.string('field1', 255).notNullable(); 
        table.string('field2', 255).notNullable();
        table.bigInteger('number', 255).notNullable(); 
        table.string('field3', 255).notNullable();  
        table.string('email', 255).notNullable().unique(); 
        table.string('password', 255).notNullable(); 
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users'); // Rollback function
};