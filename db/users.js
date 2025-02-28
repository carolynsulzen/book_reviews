const client = require('./client.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUsers = async (inputUsername, inputPassword) => {
  try{
    const encryptedPassword = await bcrypt.hash(inputPassword, 10);
    
    const { rows } = await client.query(`INSERT INTO users (
      username, password)
      VALUES('${inputUsername}', '${encryptedPassword}')
      RETURNING *`);
      const user = rows[0];
      return user;
  }catch(err){console.log(err)};
}

const getUser = async (attemptedUsername, attemptedPassword) => {
try{
  const {rows} = await client.query(`
    SELECT * FROM users 
    WHERE username = '${attemptedUsername}'
    `)
    const user = rows[0];
    if(!user){
        throw Error('username and password do not match')
    } else {
      const hashedPassword = user.password;
      const isPasswordMatch = await bcrypt.compare(attemptedPassword, hashedPassword );
      
      if(isPasswordMatch){
        const assignedToken = await jwt.sign({userId: user.userId}, process.env.JWT_SECRET);
        return assignedToken;
    }else{
      throw Error ('username and password do not match');
    }
    }
}catch(err){console.log(err)}
}

const getUserByToken = async (token) =>{
 const {userId} = await jwt.verify(token, process.env.JWT_SECRET);
 console.log(userId);
 const {rows} = await client.query(`
  SELECT id, username FROM users WHERE id = ${userId} `);
  const user = rows[0];
  return user;
}

// deleteUsers

module.exports = {
  createUsers,
  getUser,
getUserByToken}