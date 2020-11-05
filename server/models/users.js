/* B"H

*/
const bcrypt = require('bcrypt');
const mysql = require('./mysql');
const cm = require('./ContactMethods');

const PREFIX = process.env.MYSQL_TABLE_PREFIX || 'Fall2020_';
const SALT_ROUNDS = process.env.SALT_ROUNDS || 8;
const Types = { ADMIN:5, USER:6 };

async function getAll(){
    //throw { status: 501, message: "This is a fake error" }
    //await Promise.resolve()
    console.log("Called Get All")
    return await mysql.query(`SELECT * FROM ${PREFIX}Users`);
}

async function get(id){
    const sql = `SELECT 
        *,
        (SELECT Value FROM ${PREFIX}ContactMethods Where User_id = ${PREFIX}Users.id AND Type='${cm.Types.EMAIL}' AND IsPrimary = true) as PrimaryEmail
    FROM ${PREFIX}Users WHERE id=?`;
    const rows = await mysql.query(sql, [id]);
    if(!rows.length) throw { status: 404, message: "Sorry, there is no such user" };
    return rows[0];
}

async function login(email, password){
    const sql = `SELECT *
    FROM ${PREFIX}Users U Join ${PREFIX}ContactMethods CM ON U.id=CM.User_id WHERE CM.Value=?`;
    const rows = await mysql.query(sql, [email]);
    if(!rows.length) throw { status: 404, message: "Sorry, that email address is not registered with us." };
    console.log({password, Password: rows[0].Password});

    const hash = await bcrypt.hash(password, rows[0].Password)
    const res = await bcrypt.compare(password, rows[0].Password)
    console.log ({res, hash})
    if(! res ) throw { status: 403, message: "Sorry, wrong password." };
    return get(rows[0].User_id);
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

async function register(FirstName, LastName, DOB, Password, User_Type, email) {
    if(await cm.exists(email)){
        throw { status: 409, message: 'You already signed up with this email. Please go to Log in.' }
    }
    const hash = await bcrypt.hash(Password, SALT_ROUNDS);
    const res = await add(FirstName, LastName, DOB, hash, User_Type);
    const emailRes = await cm.add(cm.Types.EMAIL, email, true, true, res.insertId);
    const user = await get(res.insertId);
    return user;
}

const search = async q => await mysql.query(`SELECT id, FirstName, LastName FROM ${PREFIX}Users WHERE LastName LIKE ? OR FirstName LIKE ?; `, [`%${q}%`, `%${q}%`]);

module.exports = { getAll, get, add, update, remove, getTypes, register, login, search, Types }