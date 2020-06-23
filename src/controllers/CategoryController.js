const Category = require('../models/Category');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        const categories = await Category.findAll({
            limit: 5,
            offset: (page -1) * 5,
        });

        response.header('X-Total-Pages', page);
        return response.json(categories);
    },

    async store(request, response) {
        const { category_name } = request.body;

        const [ category ] = await Category.findOrCreate({
            where: { category_name }
        });

        return response.json(category);
    },

    async update(request, response) {
        const { category_id } = request.params;
        const { category_name } = request.body;

        const category = await Category.findByPk(category_id)

        if (!category) {
            return response.status(400).json({ error: 'Category not found' });
        }

        category.category_name = category_name;

        await category.save();

        return response.json(category.category_name);
    },

    async delete(request, response) {
        const { category_id } = request.params;

        const category = await Category.findByPk(category_id)

        if (!category) {
            return response.status(400).json({ error: 'Category not found' });
        }

        await category.destroy();

        return response.json();
    }
}