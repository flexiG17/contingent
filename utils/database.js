const db = require('../db')

module.exports.isExist = async function (databaseName, condition) {
    const database = await db(databaseName).where(condition)

    return database.length !== 0
}

module.exports.save = async function (databaseName, param) {
    await db(databaseName).insert([param])
}

module.exports.getAllData = async function(databaseName){
    return await db(databaseName)
}

module.exports.remove = async function(databaseName, condition){
    await db(databaseName).where(condition).del()
}

// мб всё-таки добавить await (среда предлагает убрать)
module.exports.getCurrentData = async function(databaseName, currentColumns){
    return db(databaseName).select(currentColumns)
}

module.exports.changeData = async function(databaseName, condition, changingData){
    await db(databaseName).where(condition).update(changingData)
}