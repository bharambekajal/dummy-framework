exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary(); 
        table.integer('user_id').unsigned()
            .references('id')
            .inTable('users_draft')
            .onDelete('CASCADE');
        table.string('name', 255).notNullable(); 
        table.string('state', 255).notNullable();
        table.bigInteger('number').notNullable(); 
        table.string('city', 255).notNullable();
        table.string('occupation', 255).notNullable();  
        table.string('email', 255).notNullable().unique(); 
        table.string('password', 255).notNullable();
        table.boolean('is_active').defaultTo(true); 
        table.boolean('is_updated').defaultTo(false); 
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users'); 
};
