const getAdmin = 'SELECT * FROM admins WHERE email = $1';

const getAdminByID = 'SELECT * FROM admins WHERE id = $1';

const updateAdminByID = 'UPDATE admins SET first_name = $1, last_name = $2, email = $3, phone_number = $4 WHERE id = $5 RETURNING *';

const updateUserByID = 'UPDATE users SET name = $1, state = $2,  number= $3, city = $4, occupation = $5, email= $6 WHERE id = $7 RETURNING *';

const postBusinessScreen1Data = 'INSERT INTO users_draft (name, state , number, email,is_draft) VALUES ($1, $2, $3,$4, $5) RETURNING *';

const getUserById = 'SELECT * FROM users_draft WHERE id = $1';

const getUserDraft = 'SELECT * FROM users_draft WHERE is_draft = true';

const updateUserDraft = 'UPDATE  users_draft SET name = $1, state = $2,  number= $3, email = $4,is_draft =$5 WHERE id = $6 RETURNING *';

const getUserByEmailId = 'SELECT * FROM users WHERE email = $1';

const getUserDraftByEmailId = 'SELECT * FROM users_draft WHERE email = $1';

const getUserByName = 'SELECT * FROM users WHERE name ILIKE $1';

const getUsesrById = 'UPDATE users SET password = $1 WHERE id = $2 RETURNING *';

const getRegisteredUserById = 'SELECT * FROM users WHERE id = $1';

const getRegisteredUser = 'SELECT * FROM users';

const createUser = `
  INSERT INTO users (name,state,number,city,occupation, email, password,is_updated)
  VALUES ($1, $2, $3, $4, $5,$6 ,$7,$8) RETURNING id, email;
`;

module.exports = {
  getUserDraftByEmailId,updateUserDraft, getUserDraft,getAdmin,getAdminByID,postBusinessScreen1Data,getUserById,getUserByEmailId,createUser,getRegisteredUserById,getUserByName,getRegisteredUser,getUsesrById,updateAdminByID,updateUserByID
}