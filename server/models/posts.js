/* B"H

*/
const mysql = require('./mysql');
const cm = require('./ContactMethods');
const comments = require('./comments');

const PREFIX = process.env.MYSQL_TABLE_PREFIX || 'Fall2020_';
const MediaTypes = { GIF: 'image/gif', JPG: 'image/jpeg', PNG: 'image/png' };
const Privacy_Levels = { HIDDEN: 0, ONLY_ME: 1, ONLY_FRIENDS: 2, PUBLIC: 4 };

async function getAll(){
    console.log("Called Get All")
    const sql = `
        SELECT 
            P.*, FirstName, LastName,
            (SELECT Value FROM ${PREFIX}ContactMethods Where User_id = U.id AND Type='${cm.Types.EMAIL}' AND IsPrimary = 1) as PrimaryEmail,
            (SELECT COUNT(*) FROM ${PREFIX}Reactions WHERE Post_id = P.id) as Reactions
        FROM ${PREFIX}Posts P Join ${PREFIX}Users U ON P.Owner_id = U.id`
        console.log(sql);
    return await mysql.query(sql);
}

async function getByUser(user_id){
    console.log("Called Get All")
    const sql = `
        SELECT 
            P.*, FirstName, LastName,
            (SELECT Value FROM ${PREFIX}ContactMethods Where User_id = U.id AND Type='${cm.Types.EMAIL}' AND IsPrimary = 1) as PrimaryEmail,
            (SELECT COUNT(*) FROM ${PREFIX}Reactions WHERE Post_id = P.id) as Reactions
        FROM ${PREFIX}Posts P Join ${PREFIX}Users U ON P.Owner_id = U.id
        WHERE P.Owner_id = ?`
        console.log(sql);

        const posts = await mysql.query(sql, [user_id]);

        for (const p of posts) {
            p.Comments = await comments.getForPost(p.id); 
        }

    return posts;
}

async function getFeed(user_id){
    console.log("Called Get All")
    const sql = `
        SELECT 
            P.*, FirstName, LastName,
            (SELECT Value FROM ${PREFIX}ContactMethods Where User_id = U.id AND Type='${cm.Types.EMAIL}' AND IsPrimary = 1) as PrimaryEmail,
            (SELECT COUNT(*) FROM ${PREFIX}Reactions WHERE Post_id = P.id) as Reactions
        FROM ${PREFIX}Posts P Join ${PREFIX}Users U ON P.Owner_id = U.id`
        console.log(sql);
    return await mysql.query(sql);
}

async function get(id){
    const sql = `SELECT 
        *
    FROM ${PREFIX}Posts WHERE id=?`;
    const rows = await mysql.query(sql, [id]);
    if(!rows.length) throw { status: 404, message: "Sorry, there is no such post" };
    return rows[0];
}

async function getTypes(){
    return await mysql.query(`SELECT id, Name FROM ${PREFIX}Types WHERE Type_id = 3`);
}

async function add(URL, Text, Media_Type, Privacy_Setting, Owner_id){
    const sql = `INSERT INTO ${PREFIX}Posts (created_at, URL, Text, Media_Type, Privacy_Setting, Owner_id) VALUES ? ;`;
    const params = [[new Date(), URL, Text, Media_Type, Privacy_Setting, Owner_id]];
    const res = await mysql.query(sql, [params]);
    return get(res.insertId);
}

async function update(id, URL, Text, Media_Type, Privacy_Setting, Owner_id){
    const sql = `UPDATE ${PREFIX}Posts SET ? WHERE id = ?;`;
    const params = { URL, Text, Media_Type, Privacy_Setting, Owner_id };
    const res = await mysql.query(sql, [params]);
    return get(res.insertId);
}

async function remove(id){
    const sql = `DELETE FROM ${PREFIX}Posts WHERE id = ?`;
    return await mysql.query(sql, [id]);
}

const search = async q => await mysql.query(`SELECT id, URL, Text, Media_Type FROM ${PREFIX}Posts WHERE Text LIKE ? ; `, [`%${q}%`]);

module.exports = { getAll, get, add, update, remove, getTypes, search, MediaTypes, Privacy_Levels, getByUser, getFeed }