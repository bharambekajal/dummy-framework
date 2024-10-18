/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries in 'useradmin' table
  return knex('admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        { id: 1, username: 'admin1', password: 'password1' },
        { id: 2, username: 'admin2', password: 'password12' },
        { id: 3, username: 'admin3', password: 'password123' }
      ]);
    });
};