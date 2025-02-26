const client = require('./db/client.js');
client.connect();
const createUsers = require('./db/users.js');
const createBooks = require('./db/books.js');
const createReviews = require ('./db/reviews.js');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send(`welcome to book reviews`);
})

app.post('/api/v1/users', async (req, res, next)=>{
  const { username, password } = req.body;
  try{
    const newUser = await createUsers(username, password);
    console.log(newUser);
    res.send(newUser);
  }catch(err){console.log(err)};
});

app.post('/api/v1/books', async (req, res, next)=>{
  const { name, author } = req.body;
  try{
    const newBook = await createBooks(name, author);
    console.log(newBook);
    res.send(newBook);
  }catch(err){console.log(err)};
});

app.post('/api/v1/reviews', async (req, res, next)=>{
  const { book_id, user_id } = req.body;
  try{
    const newReview = await createReviews(book_id, user_id);
    console.log(newReview);
    res.send(newReview);
  }catch(err){console.log(err)};
});

const PORT = process.env.PORT || 3000
app.listen(PORT , console.log(`listening on port ${PORT}`))