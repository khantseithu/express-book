# Express Book

This is a simple API for managing a book collection using Node.js and Express.

## Table of Contents

- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

1. Clone this repository:

`git clone https://github.com/khantseithu/express-book.git`

2. Install dependencies:

`npm install`

3. Run the app:

`npm start`

4. Open your browser and navigate to `http://localhost:3000/api/v1/books` to view the book collection.

## Endpoints

### `GET /api/v1/books`

Returns a list of all books in the collection.

### `GET /api/v1/books/:id`

Returns a single book with the specified ID.

### `POST /api/v1/books`

Adds a new book to the collection.

### `PATCH /api/v1/books/:id`

Updates a book with the specified ID.

### `DELETE /api/v1/books/:id`

Deletes a book with the specified ID.

## Built With

- Node.js
- Express
- fs (Node.js file system module)

## License

This project is licensed under the [MIT License](LICENSE).
