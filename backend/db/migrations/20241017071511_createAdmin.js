exports.up = function (knex) {
    return knex.schema.createTable('admins', (table) => {
      table.increments('id').primary(); // Auto-incremented primary key
      table.string('first_name', 50).notNullable(); // First name of the admin
      table.string('last_name', 50).notNullable(); // Last name of the admin
      table.string('email', 100).notNullable().unique(); // Email with unique constraint
      table.string('password', 255).notNullable(); // Encrypted password
      table.string('phone_number', 15).unique(); // Optional phone number with unique constraint
      table.string('role', 50).defaultTo('admin'); // Role (e.g., admin, superadmin)
      table.boolean('is_active').defaultTo(true); // Account status (active/inactive)
      table.timestamp('last_login'); // Timestamp for tracking the last login
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Record creation timestamp
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp for last update
  
      table.index(['email', 'role']); // Index for faster lookups on email and role
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('admins'); // Drops the table if the migration is rolled back
  };
  