const Publish_company = require('../models/Publish_company');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        const publish_companies = await Publish_company.findAll({
            limit: 5,
            offset: (page -1) * 5,
        });

        response.header('X-Total-Pages', page);
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