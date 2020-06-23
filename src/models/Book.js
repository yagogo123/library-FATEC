const { Model, DataTypes } = require('sequelize');

class Book extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            year: DataTypes.INTEGER,
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.belongsToMany(models.Author, { foreignKey: 'book_id', through: 'books_authors', as: 'authors' });
        this.belongsToMany(models.Category, { foreignKey: 'book_id', through: 'books_categories', as: 'categories' });
        this.belongsToMany(models.Publish_company, { foreignKey: 'book_id', through: 'books_publish_companies', as: 'publish_companies' });
    }
}

module.exports = Book;