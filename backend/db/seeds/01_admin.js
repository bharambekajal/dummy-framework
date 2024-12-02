exports.seed = async function (knex) {
 
  await knex('admins').del();

  await knex('admins').insert([
    {
      first_name: 'Alice',
      last_name: 'Smith',
      email: 'kajal.bharambe@ksolves.com',
      password: 'password1', 
      phone_number: '1234567890',
      role: 'superadmin',
      is_active: true,
      last_login: knex.fn.now(),
    },
    {
      first_name: 'Bob',
      last_name: 'Johnson',
      email: 'bob@gmail.com',
      password: 'password2', 
      phone_number: '0987654321',
      role: 'admin',
      is_active: false,
      last_login: knex.fn.now(),
    },
    {
      first_name: 'Charlie',
      last_name: 'Davis',
      email: 'charlie@gmail.com',
      password: 'hashed_password3',
      phone_number: '1122334455',
      role: 'admin',
      is_active: true,
      last_login: knex.fn.now(),
    },
  ]);
};
