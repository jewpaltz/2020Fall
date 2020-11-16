/* B"H

*/
const mysql = require('./mysql');

const PREFIX = process.env.MYSQL_TABLE_PREFIX || 'Fall2020_';
const Emojis = { LOVE: '❤️' }

async function getAll(){
    console.log("Called Get All")
    const sql = `SELECT P.*, FirstName, LastName FROM ${PREFIX}Reactions P Join ${PREFIX}Users U ON P.Owner_id = U.id`
    return await mysql.query(sql);
}

async function getForPost(post_id){
    const sql = `SELECT P.*, FirstName, LastName FROM ${PREFIX}Reactions P Join ${PREFIX}Users U ON P.Owner_id = U.id WHERE P.Post_id = ?`
    return await mysql.query(sql, [post_id]);
}

async function get(id){
    const sql = `SELECT 
        *
    FROM ${PREFIX}Reactions WHERE id=?`;
    const rows = await mysql.query(sql, [id]);
    if(!rows.length) throw { status: 404, message: "Sorry, there is no such comment" };
    return rows[0];
}

async function add( Emoji = Emojis.LOVE, Post_id, Owner_id){
    const sql = `INSERT INTO ${PREFIX}Reactions (created_at, Emoji, Post_id, Owner_id) VALUES ? ;`;
    const params = [[new Date(), Emoji, Post_id, Owner_id]];
    const res = await mysql.query(sql, [params]);
    return get(res.insertId);
}

async function update(id, Emoji, Post_id, Owner_id){
    const sql = `UPDATE ${PREFIX}Reactions SET ? WHERE id = ?;`;
    const params = { Emoji, Post_id, Owner_id };
    const res = await mysql.query(sql, [params, id]);
    return get(res.insertId);
}

async function remove(id){
    const sql = `DELETE FROM ${PREFIX}Reactions WHERE id = ?`;
    return await mysql.query(sql, [id]);
}

const search = async q => await mysql.query(`SELECT id, Text, Post_id FROM ${PREFIX}Reactions WHERE Text LIKE ? ; `, [`%${q}%`]);

module.exports = { getAll, get, add, update, remove, search, getForPost }