const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');
const Publish_company = require('../models/Publish_company');

module.exports = {
    async index(request, response) {
        const books = await Book.findAll({
            attributes: ['id', 'name', 'description', 'year'],
            include: [
                {
                    model: Author,
                    as: 'authors',
                    through: {
                    attributes: []
                    }
                },
                {
                    model: Category,
                    as: 'categories',
                    through: {
                    attributes: []
                    }
                },
                {
                    model: Publish_company,
                    as: 'publish_companies',
                    through: {
                    attributes: []
                    }
                },
            ]
        });
        return response.json(books);
    },

    async indexAuthorsBook(request, response) {
        const { book_id } = request.params;
        
        const book = await Book.findByPk(book_id, {
            include: { association: 'authors' },
        })

        if (!book) {
            return response.status(400).json({ error: 'Book not found' });
        }

        return response.json(book.authors);
    },

    async store(request, response) {
        const { name, description, author_id, category_id, publish_company_id, year } = request.body;

        const book = await Book.create({ name, description, year })

        let author_id_size = author_id.length;
        for (let i = 0; i < author_id_size; i++){
            const author = await Author.findOne({
                where: { id: author_id[i].id }
            });
            await book.addAuthor(author);
        }

        let category_id_size = category_id.length;
        for (let i = 0; i < category_id_size; i++){
            const category = await Category.findOne({
                where: { id: category_id[i].id }
            });
            await book.addCategory(category);
        }

        let publish_company_id_size = publish_company_id.length;
        for (let i = 0; i < publish_company_id_size; i++){
            const publish_company = await Publish_company.findOne({
                where: { id: publish_company_id[i].id }
            });
            await book.addPublish_company(publish_company);
        }

        return response.status(200).json();
    },

    async update(request, response) {
        const { book_id } = request.params;
        const { name, description, author_name, category_name, publish_company_name, year } = request.body;

        const book = await Book.findByPk(book_id);

        if (!book) {
            return response.status(400).json({ error: 'Book not found' });
        }

        await book.update({ name, description, year })

        const [ author ] = await Author.findOrCreate({
            where: { author_name }
        });
        const [ category ] = await Category.findOrCreate({
            where: { category_name }
        });
        const [ publish_company ] = await Publish_company.findOrCreate({
            where: { publish_company_name }
        });

        await book.addAuthor(author);
        await book.addCategory(category);
        await book.addPublish_company(publish_company);

        return response.status(200).json();
    },

    async delete(request, response) {
        const { book_id } = request.params;

        const book = await Book.findByPk(book_id);

        if (!book) {
            return response.status(400).json({ error: 'Book not found' });
        }

        await book.destroy();

        return response.status(200).json();
    }
}