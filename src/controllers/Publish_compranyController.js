const Publish_company = require('../models/Publish_company');
const Book = require('../models/Book');

module.exports = {
    async index(request, response) {
        const publish_companies = await Publish_company.findAll({
            attributes: ['id', 'publish_company_name'],
            include: 
                {
                    model: Book,
                    as: 'books',
                    through: {
                    attributes: []
                    }
                },
        });

        return response.json(publish_companies);
    },

    async store(request, response) {
        const { publish_company_name } = request.body;

        const [ publish_company ] = await Publish_company.findOrCreate({
            where: { publish_company_name }
        });

        return response.json(publish_company);
    },

    async update(request, response) {
        const { publish_company_id } = request.params;
        const { publish_company_name } = request.body;

        const publish_company = await Publish_company.findByPk(publish_company_id)

        if (!publish_company) {
            return response.status(400).json({ error: 'Publish Company not found' });
        }

        publish_company.publish_company_name = publish_company_name;

        await publish_company.save();

        return response.json(publish_company);
    },

    async delete(request, response) {
        const { publish_company_id } = request.params;

        const publish_company = await Publish_company.findByPk(publish_company_id)

        if (!publish_company) {
            return response.status(400).json({ error: 'Publish Company not found' });
        }

        await publish_company.destroy();

        return response.json();
    }
}