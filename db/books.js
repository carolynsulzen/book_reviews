const client = require('./client.js');

const createBooks = async(inputBook, inputAuthor) => {
try{
  const { rows } = await client.query(`INSERT INTO books (name, author)
    VALUES ('${inputBook}','${inputAuthor}')
   RETURNING *`);
   const book = rows[0];
   return book;
}catch(err){console.log(err)};
}

const getBooks = async () => {
 try{
  const { rows:books } = await client.query(`
    SELECT * FROM books`);

    return books;
 }catch(err){console.log(err)}
}
// deleteBooks

module.exports = {
  createBooks,
  getBooks
}