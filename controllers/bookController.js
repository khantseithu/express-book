const fs = require('fs');

const bookData = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/books.json`)
);

exports.checkBody = (req, res, next) => {
  if (!req.body.title || !req.body.author) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing required fields: title, author',
    });
  }
  next();
};

exports.getAllBooks = (req, res) => {
  //   res.send("Hello World!");
  res.status(200).json({
    status: 'success',
    results: bookData.length,
    data: {
      bookData,
    },
  });
};

exports.getSingleBook = (req, res) => {
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
};

exports.createBook = (req, res) => {
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
};

exports.updateBook = (req, res) => {
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
};

exports.deleteBook = (req, res) => {
  const id = req.params.id * 1;

  const bookIndex = bookData.findIndex((el) => el.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  // remove book
  bookData.splice(bookIndex, 1);

  fs.writeFile(
    `${__dirname}/dev-data/books.json`,
    JSON.stringify(bookData),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          message: 'Error deleting book',
        });
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
