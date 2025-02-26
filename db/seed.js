const client = require('./client.js');
const createBooks = require('./books.js');
const createReviews = require('./reviews.js');
const createUsers = require('./users.js');


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
      password VARCHAR(40) NOT NULL)`)
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

  await createUsers('samIam', '1234');
  await createUsers('penguinsRcool', '5678');
  await createUsers('rogerRabbit', '9101');
  console.log('USERS CREATED');
  await createBooks('Happy Potter', 'JK Rawlins');
  await createBooks('Lord of the Necklaces', 'JRR Tollway');
  await createBooks('Sherlock Houses', 'Arturo Canon Dale');
  console.log(`CREATED BOOKS`);
  await createReviews(2,3);
  await createReviews(1,1);
  await createReviews(1,3);
  console.log(`CREATED REVIEWS`);
  

  await client.end();
  console.log(`DISCONNECTED FROM DB`);
  
}

syncAndSeed();