/* B"H

*/

const data = [{ name: 'Moshe', age: 43}, { name: 'Biden', age: 78 }]

async function getAll(){
    //throw { status: 501, message: "This is a fake error" }
    //await Promise.resolve()
    console.log("Called Get All")
    return data;
}

async function add(name, age){
    data.push({name, age});
}


module.exports = { getAll, add, search: async q => data.filter(x=> x.name == q) }