const { Model, DataTypes } = require('sequelize');

class Author extends Model {
    static init(sequelize) {
        super.init({
            author_name: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Book, { foreignKey: 'author_id', through: 'books_authors', as: 'books' });
    }
}

module.exports = Author;