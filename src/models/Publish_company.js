const { Model, DataTypes } = require('sequelize');

class Publish_company extends Model {
    static init(sequelize) {
        super.init({
            publish_company_name: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'publish_companies'
        })
    }

    static associate(models) {
        this.belongsToMany(models.Book, { foreignKey: 'publish_company_id', through: 'books_publish_companies', as: 'books' });
    }
}

module.exports = Publish_company;