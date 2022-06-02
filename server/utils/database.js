const db = require('../db')

module.exports.isExist = async (databaseName, condition) => {
    const database = await db(databaseName).where(condition)

    return database.length !== 0
}

module.exports.getOneField = (databaseName, condition) => {
    return db(databaseName).where(condition)
}

module.exports.save = async (databaseName, param) => {
    await db(databaseName).insert([param])
}

module.exports.getAllData = async (databaseName) => {
    return await db(databaseName)
}

module.exports.remove = async (databaseName, condition) => {
    await db(databaseName).where(condition).del()
}

// мб всё-таки добавить await (среда предлагает убрать)
module.exports.getCurrentData = async (databaseName, columnsToDisplay) => {
    return db(databaseName).select(columnsToDisplay)
}

module.exports.changeData = async (databaseName, condition, changingData) => {
    await db(databaseName).where(condition).update(changingData)
}

module.exports.getId = async (databaseName, condition) => {
    return parseInt(await db(databaseName).where(condition).pluck('id'))
}

module.exports.getDataForDisplay = async (databaseName, condition, columnsToDisplay) => {
    return db(databaseName).where(condition).select(columnsToDisplay)
}