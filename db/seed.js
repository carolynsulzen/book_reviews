require('dotenv').config(); 
const client = require('./client.js');
const { createBooks } = require('./books.js');
const {createReviews} = require('./reviews.js');
const {createUsers} = require('./users.js');


const dropTables = async () => {
  try{
    await client.query(`DROP TABLE IF EXISTS reviews`);
  }catch(err){console.log(err)};
  try{
    await client.query(`DROP TABLE IF EXISTS users`);
  }catch(err){console.log(err)};
  try{
    await client.query(`DROP TABLE IF EXISTS books`);
  }catch(err){console.log(err)};
  }

const createTables = async () => {
  try{
  await client.query(`CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    author VARCHAR(75) NOT NULL)`)
  }catch(err){console.log(err)};

  try{
    await client.query(`CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(35) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL)`)
  }catch(err){console.log(err)};

  try{
    await client.query(`CREATE TABLE reviews(
      book_id INTEGER REFERENCES books(id),
      user_id INTEGER REFERENCES users(id))`)
  }catch(err){console.log(err)};
}


const syncAndSeed = async () => {
  await client.connect();
  console.log(`CONNECTED TO DB`);
  
  await dropTables();
  console.log(`DROPPED TABLES`);

  await createTables();
  console.log(`CREATED TABLES`);

  const sam = await createUsers('samIam', '1234');
  const penguin = await createUsers('penguinsRcool', '5678');
  const roger = await createUsers('rogerRabbit', '9101');
  console.log('USERS CREATED');
  const hp = await createBooks('Happy Potter', 'JK Rawlins');
  const lotn = await createBooks('Lord of the Necklaces', 'JRR Tollway');
  const sh = await createBooks('Sherlock Houses', 'Arturo Canon Dale');
  console.log(`CREATED BOOKS`);
  await createReviews(sam.id,hp.id);
  await createReviews(sam.id,sh.id);
  await createReviews(roger.id,lotn.id);
  console.log(`CREATED REVIEWS`);
  

  await client.end();
  console.log(`DISCONNECTED FROM DB`);
  
}

syncAndSeed();