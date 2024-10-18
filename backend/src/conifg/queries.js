const getAdmin = 'SELECT * FROM admin WHERE username = $1';

const postBusinessScreen1Data = 'INSERT INTO business_screen1_data (field1, field2, email) VALUES ($1, $2, $3) RETURNING *';

const getUserById = 'SELECT * FROM business_screen1_data WHERE id = $1';

const getUserByEmailId = 'SELECT * FROM users WHERE email = $1';

const createUser = `
  INSERT INTO users (field1,field2, email, password)
  VALUES ($1, $2, $3, $4) RETURNING id, email;
`;

module.exports = {
   getAdmin,postBusinessScreen1Data,getUserById,getUserByEmailId,createUser
}