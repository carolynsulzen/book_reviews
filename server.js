require('dotenv').config(); 
const client = require('./db/client.js');
client.connect();
const {createUsers, getUser,getUserByToken} = require('./db/users.js');
const {createBooks, getBooks} = require('./db/books.js');
const {createReviews, getReviews} = require ('./db/reviews.js');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send(`welcome to book reviews`);
});

app.get('/api/v1/items', async (req, res, next)=>{
  const allItems = await getBooks();
  res.send(allItems);
});

app.get('/api/v1/items/:itemId', async (req, res,next) => {
  console.log(`req params`, req.params);
  if(req.params.itemId){
    const allItems = await getBooks();
    const foundItem = await allItems.find((singleBook)=>{
      return Number (req.params.itemId)=== singleBook.id
    })
    res.send(foundItem);
  } else {res.send(err)}

});

//unsure how to get the code to show the reviews associated with the item(book)id
app.get('/api/v1/items/:itemId/reviews', async (req, res, next) => {
  console.log(`req params`, req.params);
  if(req.params.itemId){
    const allItems = await getBooks();
    const foundItem = await allItems.find((singleBook)=>{
      return Number (req.params.itemId)=== singleBook.id
    })
    res.send(foundItem);
    console.log(foundItem);
  } if(req.params.itemId.reviews){
    const allReviews = await getReviews();
    const foundReviews = await allReviews.find((singleReview)=>{
      return Number (req.params.itemId.reviews) === singleReview.book_id;
    })
    res.send(foundReviews);
    console.log(foundReviews);
  }
  else {console.log(`not working`)}
});

app.post('/api/v1/register', async (req, res, next)=>{
  const { username, password } = req.body;
  try{
    const newUser = await createUsers(username, password);
    console.log(newUser);
    res.send(newUser);
  }catch(err){console.log(err)};
});

app.post('/api/v1/login', async(req, res, next) => {
  try{
    const { username, password } = req.body;
    const token = await getUser(username, password);
    res.send({token: token});
  }catch(err){console.log(err)
    next(err);
  }
});

app.get('/api/v1/me', async (req, res, next) =>{
  const token = req.headers.authorization;
  const user = await getUserByToken(token)
  res.send(user);
} )


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

const PORT = process.env.PORT 
app.listen(PORT , console.log(`listening on port ${PORT}`))