/* B"H

*/
const mysql = require('./mysql');

const PREFIX = process.env.MYSQL_TABLE_PREFIX || 'Fall2020_';

async function getAll(){
    console.log("Called Get All")
    const sql = `SELECT P.*, FirstName, LastName FROM ${PREFIX}Comments P Join ${PREFIX}Users U ON P.Owner_id = U.id`
    return await mysql.query(sql);
}

async function getForPost(post_id){
    const sql = `SELECT P.*, FirstName, LastName FROM ${PREFIX}Comments P Join ${PREFIX}Users U ON P.Owner_id = U.id WHERE P.Post_id = ?`
    return await mysql.query(sql, [post_id]);
}

async function get(id){
    const sql = `SELECT 
        *
    FROM ${PREFIX}Comments WHERE id=?`;
    const rows = await mysql.query(sql, [id]);
    if(!rows.length) throw { status: 404, message: "Sorry, there is no such comment" };
    return rows[0];
}

async function add( Text, Post_id, Owner_id){
    const sql = `INSERT INTO ${PREFIX}Comments (created_at, Text, Post_id, Owner_id) VALUES ? ;`;
    const params = [[new Date(), Text, Post_id, Owner_id]];
    const res = await mysql.query(sql, [params]);
    return get(res.insertId);
}

async function update(id, Text, Post_id, Owner_id){
    const sql = `UPDATE ${PREFIX}Comments SET ? WHERE id = ?;`;
    const params = { Text, Post_id, Owner_id };
    const res = await mysql.query(sql, [params, id]);
    return get(res.insertId);
}

async function remove(id){
    const sql = `DELETE FROM ${PREFIX}Comments WHERE id = ?`;
    return await mysql.query(sql, [id]);
}

const search = async q => await mysql.query(`SELECT id, Text, Post_id FROM ${PREFIX}Comments WHERE Text LIKE ? ; `, [`%${q}%`]);

module.exports = { getAll, get, add, update, remove, search, getForPost }