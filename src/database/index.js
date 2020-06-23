const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');
const Publish_company = require('../models/Publish_company');

const connection = new Sequelize(dbConfig);

Book.init(connection);
Author.init(connection);
Category.init(connection);
Publish_company.init(connection);

Book.associate(connection.models);
Author.associate(connection.models);
Category.associate(connection.models);
Publish_company.associate(connection.models);

module.exports = connection;