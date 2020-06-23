const express = require('express');
const BookController = require('./controllers/BookController');
const AuthorController = require('./controllers/AuthorController');
const CategoryController = require('./controllers/CategoryController');
const Publish_companyController = require('./controllers/Publish_compranyController');

const routes = express.Router();

routes.get('/books', BookController.index);
routes.get('/books/:book_id/authors', BookController.indexAuthorsBook);
routes.post('/books', BookController.store);
routes.put('/books/:book_id', BookController.update);
routes.delete('/books/:book_id', BookController.delete);

routes.get('/authors', AuthorController.index);
routes.post('/authors', AuthorController.store);
routes.put('/authors/:author_id', AuthorController.update);
routes.delete('/authors/:author_id', AuthorController.delete);

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);
routes.put('/categories/:category_id', CategoryController.update);
routes.delete('/categories/:category_id', CategoryController.delete);

routes.get('/publish_companies', Publish_companyController.index);
routes.post('/publish_companies', Publish_companyController.store);
routes.put('/publish_companies/:publish_company_id', Publish_companyController.update);
routes.delete('/publish_companies/:publish_company_id', Publish_companyController.delete);

module.exports = routes;