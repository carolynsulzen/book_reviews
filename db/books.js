const client = require('./client.js');

const createBooks = async(inputBook, inputAuthor) => {
try{
  await client.query(`INSERT INTO books (name, author)
    VALUES ('${inputBook}','${inputAuthor}')`)
}catch(err){console.log(err)};
}




// getBooks
// deleteBooks

module.exports = createBooks;