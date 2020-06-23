const Author = require('../models/Author');

module.exports = {
    async index(request, response) {
        const authors = await Author.findAll();

        return response.json(authors);
    },

    async store(request, response) {
        const { author_name } = request.body;

        const [ author ] = await Author.findOrCreate({
            where: { author_name }
        });

        return response.json(author);
    },

    async update(request, response) {
        const { author_id } = request.params;
        const { author_name } = request.body;

        const author = await Author.findByPk(author_id)

        if (!author) {
            return response.status(400).json({ error: 'Author not found' });
        }

        author.author_name = author_name;

        await author.save();

        return response.json(author.author_name);
    },

    async delete(request, response) {
        const { author_id } = request.params;

        const author = await Author.findByPk(author_id)

        if (!author) {
            return response.status(400).json({ error: 'Author not found' });
        }

        await author.destroy();

        return response.json();
    }
}