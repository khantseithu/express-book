const express = require('express');
const fs = require('fs');
const app = express();

//read json file
const bookData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/books.json`)
);

// Middleware
app.use(express.json());

//return all books
app.get('/api/v1/books', (req, res) => {
  //   res.send("Hello World!");
  res.status(200).json({
    status: 'success',
    results: bookData.length,
    data: {
      bookData,
    },
  });
});

//return single book
app.get('/api/v1/books/:id', (req, res) => {
  const id = req.params.id * 1;
  const book = bookData.find((el) => el.id === id);

  if (!book) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
});

//create new book
app.post('/api/v1/books', (req, res) => {
  // const newId = bookData[bookData.length - 1].id + 1;
  console.log(req.body);
  const newId = Math.max(...bookData.map((el) => el.id)) + 1;
  const newBook = Object.assign({ id: newId }, req.body);
  console.log(newBook);
  bookData.push(newBook);

  fs.writeFile(
    `${__dirname}/dev-data/books.json`,
    JSON.stringify(bookData),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          book: newBook,
        },
      });
    }
  );
});

//update book
app.patch('/api/v1/books/:id', (req, res) => {
  const id = req.params.id * 1;
  console.log(id);
  const bookIndex = bookData.find((el) => el.id === id);

  if (!bookIndex) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updatedBook = Object.assign(bookIndex, req.body);
  bookData[bookIndex] = updatedBook;

  fs.writeFile(
    `${__dirname}/dev-data/books.json`,
    JSON.stringify(bookData),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          book: updatedBook,
        },
      });
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      book: updatedBook,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
