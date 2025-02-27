const client = require('./client.js');

const createReviews = async (idOfBook, idOfUser) => {
try{
  await client.query(`INSERT INTO reviews(book_id, user_id)
    VALUES ('${idOfBook}','${idOfUser}')`)
}catch(err){console.log(err)};
}

const getReviews = async () => {
  try{
   const { rows:reviews } = await client.query(`
     SELECT * FROM reviews`);
 
     return reviews;
  }catch(err){console.log(err)}
 }


// deleteReviews

module.exports = {
  createReviews,
  getReviews
}