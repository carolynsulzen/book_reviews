const { Client } = require('pg');
const client = new Client ('postgres://localhost:5432/book_reviews');

// client.connect();

module.exports = client;