const express = require('express');
const fs = require('fs');
const app = express();

const bookRoute = require('./routes/bookRoutes');

// Middleware
app.use(express.json());

//controllers

app.use('/api/v1/books', bookRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
