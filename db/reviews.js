const client = require('./client.js');

const createReviews = async (idOfBook, idOfUser) => {
try{
  await client.query(`INSERT INTO reviews(book_id, user_id)
    VALUES ('${idOfBook}','${idOfUser}')`)
}catch(err){console.log(err)};
}

// getReviews
// deleteReviews

module.exports = createReviews;