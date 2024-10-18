// migrations/20241017120000_business_screen1_data.js
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary(); // Auto-incrementing primary key
        table.string('field1', 255).notNullable(); // Field 1
        table.string('field2', 255).notNullable(); // Field 2
        table.string('email', 255).notNullable().unique(); // Unique email
        table.string('password', 255).notNullable(); // Password
        // confirmPassword is not stored in the database
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp for creation
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users'); // Rollback function
};