const db = require('../db')

function toLowerKeys(obj) {
    return Object.keys(obj).reduce((accumulator, key) => {
        accumulator[key.toLowerCase()] = obj[key]
        return accumulator
    }, {})
}

module.exports = new class StudentService {
    async columns() {
        let data = await db.informationColumns
            .select('column_name', 'column_type', 'column_comment')
            .where({table_name: 'students'})
            .orderBy('ordinal_position')

        return data.map(toLowerKeys).map(element => new Object({
            name: element['column_name'],
            type: element['column_type'],
            ru: element['column_comment']
        }))
    }
}