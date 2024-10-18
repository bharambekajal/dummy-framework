/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'dummydb', // Your database name
      user: 'postgres', // Your PostgreSQL username
      password: 'admin' 
    },
    migrations: {
      directory: './db/migrations'  // Specifies the migrations folder
    },
    seeds: {
      directory: './db/seeds'  // Specifies the seeds folder
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'dummydb', // Your database name
      user: 'postgres', // Your PostgreSQL username
      password: 'admin' 
    },
   migrations: {
    directory: './db/migrations'  // Specifies the migrations folder
  },
  seeds: {
    directory: './db/seeds'  // Specifies the seeds folder
  }
  }
};