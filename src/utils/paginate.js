async function Paginate(model, options) {
    const {
        page = 1,
        pageSize = 20,
        where = {},
        order = [["createdAt", "DESC"]],
        include = [],
        attributes = null
        } = options;

    const offset = (page -1) * pageSize;
    const limit = pageSize;

    const result = await model.findAndCountAll({
        where,
        limit,
        offset,
        order,
        include,
        attributes
    });

    return result.rows;
}

module.exports = Paginate;