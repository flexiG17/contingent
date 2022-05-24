const db = require('../db')

module.exports.isExist = async function (databaseName, param) {
    const database = await db(databaseName).where(param)

    return database.length !== 0
}

module.exports.save = async function (databaseName, param) {
    await db(databaseName).insert([param])
}