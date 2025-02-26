const { create } = require('domain');
const client = require('./client.js');

const createUsers = async (inputUsername, inputPassword) => {
  try{
    await client.query(`INSERT INTO users (
      username, password)
      VALUES('${inputUsername}', '${inputPassword}')`);
  }catch(err){console.log(err)};
}

// getUsers
// deleteUsers

module.exports = createUsers;