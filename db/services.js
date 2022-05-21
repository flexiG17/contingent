const db = require('../db');

module.exports.GetPerson = async function (body){

    const currentUser = await db('test');

    console.log(currentUser)

    //var [currentUser] = await db('test').where({Email: 'sdasd'});
}