const express = require('express');
const fs = require('fs');
const bookController = require('./../controllers/bookController');

const bookRouter = express.Router();

bookRouter
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.checkBody, bookController.createBook);

bookRouter
  .route('/:id')
  .get(bookController.getSingleBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);
