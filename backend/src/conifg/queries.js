const getAdmin = 'SELECT * FROM admin WHERE username = $1';

const postBusinessScreen1Data = 'INSERT INTO business_screen1_data (field1, field2, number, email) VALUES ($1, $2, $3,$4) RETURNING *';

const getUserById = 'SELECT * FROM business_screen1_data WHERE id = $1';

const getUserByEmailId = 'SELECT * FROM users WHERE email = $1';

const getUsesrById = 'UPDATE users SET password = $1 WHERE id = $2 RETURNING *';

const getRegisteredUserById = 'SELECT * FROM users WHERE id = $1';

const getRegisteredUser = 'SELECT * FROM users';

const getUserByNameOrUniqueId = 'SELECT * FROM users WHERE email = $1 OR field1 ILIKE $1';

const createUser = `
  INSERT INTO users (field1,field2,number,field3, email, password)
  VALUES ($1, $2, $3, $4, $5,$6) RETURNING id, email;
`;

module.exports = {
   getAdmin,postBusinessScreen1Data,getUserById,getUserByEmailId,createUser,getRegisteredUserById,getUserByNameOrUniqueId,getRegisteredUser,getUsesrById
}