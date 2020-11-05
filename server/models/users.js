/* B"H

*/
const mysql = require('./mysql');
const PREFIX = process.env.MYSQL_TABLE_PREFIX || 'Fall2020_';
const Types = { ADMIN:5, USER:6 };

//const data = [{ name: 'Moshe', age: 43}, { name: 'Biden', age: 78 }]

async function getAll(){
    //throw { status: 501, message: "This is a fake error" }
    //await Promise.resolve()
    console.log("Called Get All")
    return await mysql.query(`SELECT * FROM ${PREFIX}Users`);
}

async function get(id){
    const rows = await mysql.query(`SELECT * FROM ${PREFIX}Users WHERE id=?`, [id]);
    if(!rows.length) throw { status: 404, message: "Sorry, there is no such user" };
    return rows;
}

async function getTypes(){
    return await mysql.query(`SELECT id, Name FROM ${PREFIX}Types WHERE Type_id = 2`);
}

async function add(FirstName, LastName, DOB, Password, User_Type){
    const sql = `INSERT INTO ${PREFIX}Users (created_at, FirstName, LastName, DOB, Password, User_Type) VALUES ? ;`;
    const params = [[new Date(), FirstName, LastName, new Date(DOB), Password, User_Type]];
    return await mysql.query(sql, [params]);
}

async function update(id, FirstName, LastName, DOB, Password, User_Type){
    const sql = `UPDATE ${PREFIX}Users SET ? WHERE id = ?;`;
    const params = { FirstName, LastName, DOB: new Date(DOB), Password, User_Type };
    return await mysql.query(sql, [params, id]);
}

async function remove(id){
    const sql = `DELETE FROM ${PREFIX}Users WHERE id = ?`;
    return await mysql.query(sql, [id]);
}

const search = async q => await mysql.query(`SELECT id, FirstName, LastName FROM ${PREFIX}Users WHERE LastName LIKE ? OR FirstName LIKE ?; `, [`%${q}%`, `%${q}%`]);

module.exports = { getAll, get, add, update, remove, getTypes, search, Types }